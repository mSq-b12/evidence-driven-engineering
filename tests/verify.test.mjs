import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { verifyRepository } from '../scripts/verify.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('the distributable project validates cleanly', async () => {
  const result = await verifyRepository(repoRoot);
  assert.deepEqual(result.errors, []);
});

test('verification rejects references escaping the skill directory', async (t) => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'evidence-method-'));
  t.after(() => rm(tempRoot, { recursive: true, force: true }));
  await mkdir(path.join(tempRoot, '.agents', 'plugins'), { recursive: true });
  await mkdir(path.join(tempRoot, 'plugin', 'skills', 'evidence-driven-engineering', 'references'), { recursive: true });
  await writeFile(path.join(tempRoot, '.agents', 'plugins', 'marketplace.json'), JSON.stringify({ name: 'evidence-driven-engineering', plugins: [{ name: 'evidence-driven-engineering', source: { source: 'local', path: './plugin' }, policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' }, category: 'Productivity' }] }));
  await writeFile(path.join(tempRoot, 'plugin', 'plugin.json'), JSON.stringify({ name: 'evidence-driven-engineering', version: '1.0.0', description: 'Test plugin' }));
  await writeFile(path.join(tempRoot, 'plugin', 'skills', 'evidence-driven-engineering', 'SKILL.md'), '---\nname: evidence-driven-engineering\ndescription: Use when testing distribution.\n---\n\n[escape](../../../../outside.md)\n');
  const result = await verifyRepository(tempRoot);
  assert.ok(result.errors.some((error) => error.includes('escapes')));
});

test('verification enforces one canonical skill copy', async (t) => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'evidence-method-'));
  t.after(() => rm(tempRoot, { recursive: true, force: true }));
  await mkdir(path.join(tempRoot, 'plugin', 'skills', 'evidence-driven-engineering'), { recursive: true });
  await mkdir(path.join(tempRoot, 'duplicate'), { recursive: true });
  await writeFile(path.join(tempRoot, 'plugin', 'skills', 'evidence-driven-engineering', 'SKILL.md'), '---\nname: evidence-driven-engineering\ndescription: Use when testing distribution.\n---\n');
  await writeFile(path.join(tempRoot, 'duplicate', 'SKILL.md'), '---\nname: evidence-driven-engineering\ndescription: duplicate\n---\n');

  const result = await verifyRepository(tempRoot);
  assert.ok(result.errors.some((error) => error.includes('canonical')));
});

test('verification catches broken local documentation links', async (t) => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'evidence-method-'));
  t.after(() => rm(tempRoot, { recursive: true, force: true }));
  await writeFile(path.join(tempRoot, 'README.md'), '[missing guide](docs/not-created.md)\n');

  const result = await verifyRepository(tempRoot);
  assert.ok(result.errors.some((error) => error.includes('Broken Markdown link')));
});
