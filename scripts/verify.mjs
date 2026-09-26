import { readdir, readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const skillName = 'evidence-driven-engineering';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function walk(dir) {
  const entries = (await readdir(dir, { withFileTypes: true })).filter((entry) => entry.name !== '.git' && entry.name !== 'node_modules');
  const paths = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  }));
  return paths.flat();
}

export async function verifyRepository(root = repoRoot) {
  const errors = [];
  const files = await walk(root).catch((error) => {
    errors.push(`Cannot read repository at ${root}: ${error.message}`);
    return [];
  });
  const relativeFiles = files.map((file) => path.relative(root, file).replaceAll('\\', '/'));
  const fileSet = new Set(relativeFiles);
  const requiredFiles = [
    'README.md',
    'LICENSE',
    'CHANGELOG.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
    '.agents/plugins/marketplace.json',
    'plugin/plugin.json',
    `plugin/skills/${skillName}/SKILL.md`,
    'scripts/verify.mjs',
    'scripts/smoke-test.ps1',
    'tests/verify.test.mjs',
    '.github/workflows/ci.yml',
    'docs/installation.md',
    'docs/troubleshooting.md',
    'docs/release-checklist.md',
  ];
  for (const relativePath of requiredFiles) {
    if (!fileSet.has(relativePath)) errors.push(`Required project file is missing: ${relativePath}`);
  }
  const skillFiles = relativeFiles.filter((file) => file.toLowerCase().endsWith('/skill.md'));
  if (skillFiles.length !== 1 || skillFiles[0] !== `plugin/skills/${skillName}/SKILL.md`) {
    errors.push(`Expected one canonical SKILL.md at plugin/skills/${skillName}/SKILL.md; found ${skillFiles.length}.`);
  }

  const jsonPaths = [
    '.agents/plugins/marketplace.json',
    'plugin/plugin.json',
  ];
  const jsonValues = new Map();
  for (const relativePath of jsonPaths) {
    const fullPath = path.join(root, relativePath);
    try {
      jsonValues.set(relativePath, JSON.parse(await readFile(fullPath, 'utf8')));
    } catch (error) {
      errors.push(`${relativePath}: invalid or unreadable JSON (${error.message}).`);
    }
  }

  const manifest = jsonValues.get('plugin/plugin.json');
  const marketplace = jsonValues.get('.agents/plugins/marketplace.json');
  if (manifest) {
    if (manifest.name !== skillName) errors.push('Plugin name must match the canonical skill name.');
    if (!/^\d+\.\d+\.\d+$/.test(manifest.version ?? '')) errors.push('Plugin version must use MAJOR.MINOR.PATCH.');
    if (typeof manifest.description !== 'string' || !manifest.description.trim()) errors.push('Plugin description is required.');
  }
  if (manifest && fileSet.has('CHANGELOG.md')) {
    const changelog = await readFile(path.join(root, 'CHANGELOG.md'), 'utf8');
    if (!changelog.includes(`## [${manifest.version}]`)) errors.push('CHANGELOG.md must contain a heading for the current plugin version.');
  }
  if (marketplace) {
    if (marketplace.name !== skillName) errors.push('Marketplace name must match the project name.');
    if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length !== 1) errors.push('Marketplace must expose exactly one plugin.');
    const entry = marketplace.plugins?.[0];
    if (entry?.name !== manifest?.name) errors.push('Marketplace plugin name must match plugin.json.');
    if (entry?.source?.source !== 'local' || entry?.source?.path !== './plugin') errors.push('Marketplace must point to the bundled ./plugin directory.');
    if (!['AVAILABLE', 'INSTALLED_BY_DEFAULT', 'NOT_AVAILABLE'].includes(entry?.policy?.installation)) errors.push('Marketplace installation policy is invalid.');
    if (!['ON_INSTALL', 'ON_USE'].includes(entry?.policy?.authentication)) errors.push('Marketplace authentication policy is invalid.');
  }

  const skillPath = path.join(root, 'plugin', 'skills', skillName, 'SKILL.md');
  let skillText = '';
  try {
    skillText = await readFile(skillPath, 'utf8');
  } catch (error) {
    errors.push(`Canonical SKILL.md is missing or unreadable (${error.message}).`);
  }
  const frontmatter = skillText.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) {
    errors.push('SKILL.md must start with closed YAML frontmatter.');
  } else {
    const name = frontmatter[1].match(/^name:\s*([^\r\n]+)\s*$/m)?.[1]?.trim();
    const description = frontmatter[1].match(/^description:\s*(.+)\s*$/m)?.[1]?.trim();
    if (name !== skillName) errors.push('SKILL.md name must match the plugin and folder name.');
    if (!description) errors.push('SKILL.md description is required.');
  }

  const referencePattern = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const [, target] of skillText.matchAll(referencePattern)) {
    if (/^(https?:|mailto:|#)/i.test(target)) continue;
    let cleanTarget;
    try {
      cleanTarget = decodeURIComponent(target.split('#')[0]).replaceAll('/', path.sep);
    } catch {
      errors.push(`Malformed URL encoding in skill reference: ${target}`);
      continue;
    }
    const resolved = path.resolve(root, 'plugin', 'skills', skillName, cleanTarget);
    const realSkillRoot = await realpath(path.join(root, 'plugin', 'skills', skillName)).catch(() => path.resolve(root, 'plugin', 'skills', skillName));
    if (resolved !== realSkillRoot && !resolved.startsWith(`${realSkillRoot}${path.sep}`)) {
      errors.push(`Reference escapes the skill directory: ${target}`);
      continue;
    }
    if (!fileSet.has(path.relative(root, resolved).replaceAll('\\', '/'))) {
      errors.push(`Broken skill reference: ${target}`);
    }
  }

  for (const relativePath of relativeFiles.filter((file) => file.toLowerCase().endsWith('.md'))) {
    const contents = await readFile(path.join(root, relativePath), 'utf8');
    for (const [, rawTarget] of contents.matchAll(referencePattern)) {
      const target = rawTarget.trim();
      if (!target || /^(https?:|mailto:|#)/i.test(target)) continue;
      let cleanTarget;
      try {
        cleanTarget = decodeURIComponent(target.split('#')[0]).replaceAll('/', path.sep);
      } catch {
        errors.push(`Malformed URL encoding in Markdown link (${relativePath}): ${target}`);
        continue;
      }
      const resolved = path.resolve(root, path.dirname(relativePath), cleanTarget);
      if (!resolved.startsWith(`${path.resolve(root)}${path.sep}`)) {
        errors.push(`Markdown link escapes the repository (${relativePath}): ${target}`);
      } else if (!fileSet.has(path.relative(root, resolved).replaceAll('\\', '/'))) {
        errors.push(`Broken Markdown link (${relativePath}): ${target}`);
      }
    }
  }

  const textPaths = relativeFiles.filter((file) => /\.(md|mjs|json|ya?ml|txt|yml)$/i.test(file));
  for (const relativePath of textPaths) {
    const contents = await readFile(path.join(root, relativePath), 'utf8');
    if (/C:\\Users\\[^\s]+|\/Users\/[^/\s]+|\/home\/[^/\s]+/i.test(contents)) {
      errors.push(`Machine-specific home path found in ${relativePath}.`);
    }
  }

  return { errors };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await verifyRepository();
  if (result.errors.length) {
    console.error('Repository verification failed:');
    for (const error of result.errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    const manifest = JSON.parse(await readFile(path.join(repoRoot, 'plugin', 'plugin.json'), 'utf8'));
    console.log(`Verified ${manifest.name} v${manifest.version}: one skill, valid manifests, and all skill references resolve.`);
  }
}
