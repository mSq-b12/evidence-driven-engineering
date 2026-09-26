# Site para João Fecchio

Este site estático apresenta a skill Evidence-driven Engineering como um presente para João e orienta a instalação real no Codex.

## Stack e estrutura

- `index.html`: conteúdo, metadados de compartilhamento e instalação.
- `styles.css`: direção visual e breakpoints sem framework.
- `app.js`: feedback dos botões de copiar e nota opcional.
- `assets/`: fotografia gerada para a capa e imagem de compartilhamento.
- `../scripts/build-site.mjs`: gera `../dist/` e substitui a versão diretamente de `../plugin/plugin.json`.

Não há backend, contas, coleta de dados, cookies, analytics ou dependências de runtime. O site usa caminhos relativos para funcionar sob o subcaminho do GitHub Pages.

## Desenvolvimento local

Na raiz do repositório, com Node.js 22 ou mais recente:

```sh
node scripts/build-site.mjs
```

Sirva `dist/` e abra `http://127.0.0.1:4173/`:

```sh
node scripts/serve-site.mjs
```

Não abra `site/index.html` diretamente: ele contém marcadores que o build resolve.

## Verificação

```sh
node scripts/verify.mjs
node --test
node scripts/build-site.mjs
```

Para verificar o fluxo de instalação, use um `CODEX_HOME` descartável, adicione `mSq-b12/evidence-driven-engineering@v1.0.0`, instale `evidence-driven-engineering@evidence-driven-engineering`, confira `codex plugin list --json`, e remova somente esse diretório temporário. O navegador não pode conferir o estado da instalação.

## Publicação

O workflow `.github/workflows/pages.yml` publica `dist/` no GitHub Pages após push para `main`. A URL é `https://mSq-b12.github.io/evidence-driven-engineering/`. Configure a origem do Pages como **GitHub Actions**. O repositório pode receber um domínio personalizado depois; nesse caso, atualize `canonical`, `og:url` e as URLs absolutas das imagens de compartilhamento em `index.html`.

## Nova versão da skill

Atualize a versão no manifesto `plugin/plugin.json` e o changelog, publique a tag correspondente e rode o build. O número e a referência de instalação do site são derivados do manifesto. Antes de compartilhar a nova página, faça um teste de instalação usando essa tag. Atualize a cópia do site apenas se o fluxo do Codex mudar.
