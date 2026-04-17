# Quartz Site

This repository is the **main Quartz site repo**.

It is responsible for:

- Quartz framework and site config
- local build / deployment
- the content sync script
- the `content/` submodule pointer

The published notes themselves live in the separate **quartz-content** repository, which is mounted here as `content/`.

---

## Structure

```text
quartz/
├─ quartz/                    # Quartz core
├─ quartz-custom/             # Optional custom code
├─ content/                   # Git submodule -> quartz-content
├─ utils/
│  └─ content-sync/
│     └─ index.js
├─ quartz.config.ts
├─ quartz.layout.ts
├─ package.json
└─ README.md
```

---

## Install dependencies

Run this in the root of this repo:

```bash
npm install
npm install fs-extra gray-matter
```

If `fs-extra` and `gray-matter` are already present in `package.json`, a normal `npm install` is enough.

---

## Environment variables

This repo expects two environment variables:

- `OBSIDIAN_VAULT_PATH`
- `QUARTZ_CONTENT_PATH`

### Recommended values on this machine

```text
OBSIDIAN_VAULT_PATH = C:\Users\jialin.yu\Documents\obsidian-sync
QUARTZ_CONTENT_PATH = C:\Users\jialin.yu\Downloads\quartz\content
```

### Set them for the current PowerShell session

```powershell
$env:OBSIDIAN_VAULT_PATH="C:\Users\jialin.yu\Documents\obsidian-sync"
$env:QUARTZ_CONTENT_PATH="C:\Users\jialin.yu\Downloads\quartz\content"
```

### Persist them as user environment variables

```powershell
[System.Environment]::SetEnvironmentVariable(
  "OBSIDIAN_VAULT_PATH",
  "C:\Users\jialin.yu\Documents\obsidian-sync",
  "User"
)

[System.Environment]::SetEnvironmentVariable(
  "QUARTZ_CONTENT_PATH",
  "C:\Users\jialin.yu\Downloads\quartz\content",
  "User"
)
```

Open a **new** terminal and verify:

```powershell
echo $env:OBSIDIAN_VAULT_PATH
echo $env:QUARTZ_CONTENT_PATH
```

---

## Content sync rules

The sync script applies these rules:

- scan the entire Obsidian vault
- publish only Markdown notes whose **frontmatter tags include `blog`**
- skip a few system directories:
  - `.obsidian`
  - `.git`
  - `node_modules`
  - `.trash`
- preserve the original relative path
- mirror matching notes into `content/`
- preserve `README.md` and `index.md` in `content/`
- copy `assets/` folders next to published notes

`content/index.md` is maintained manually and is **not** deleted by sync.

---

## Run content sync

From the root of this repo:

```powershell
node .\utils\content-sync\index.js
```

---

## Normal publishing workflow

### 1. Write in Obsidian

Create or edit notes in the private vault.

To publish a note, make sure its frontmatter contains `blog`, for example:

```yaml
---
title: My Note
tags: [blog]
---
```

### 2. Sync notes from the vault into `content/`

From the root of this repo:

```powershell
node .\utils\content-sync\index.js
```

### 3. Commit and push the content repo

```powershell
cd .\content
git status
git add .
git commit -m "Sync blog notes from vault"
git push
```

### 4. Commit and push the submodule pointer in the main repo

```powershell
cd ..
git status
git add content
git commit -m "Update content submodule pointer"
git push
```

### 5. Build locally (optional)

```powershell
npx quartz build
```

Preview locally:

```powershell
npx quartz build --serve
```

---

## New machine setup

Clone the main repo with submodules:

```bash
git clone --recurse-submodules <repo-url>
```

If you already cloned it:

```bash
git submodule update --init --recursive
```

Then install dependencies:

```bash
npm install
npm install fs-extra gray-matter
```

Then make sure the environment variables are available, and run sync/build as normal.

---

## Important note about `content/`

`content/` is a **submodule working copy** of the `quartz-content` repo.

The daily workflow should use:

```text
quartz/content
```

Do **not** maintain a second active local clone of `quartz-content` for normal publishing work. That creates unnecessary pull / rebase / conflict overhead.

---

## Common mistakes

### 1. Forgetting to commit inside `content/`

If sync changed files under `content/`, you must first commit and push inside:

```powershell
cd content
git add .
git commit -m "Sync blog notes from vault"
git push
```

### 2. Forgetting to update the submodule pointer

After pushing `content/`, return to the main repo and commit:

```powershell
cd ..
git add content
git commit -m "Update content submodule pointer"
git push
```

### 3. Forgetting environment variables

If the sync script says variables are missing, verify:

```powershell
echo $env:OBSIDIAN_VAULT_PATH
echo $env:QUARTZ_CONTENT_PATH
```

### 4. Editing notes without the `blog` tag

Only notes whose frontmatter tags contain `blog` will be mirrored into `content/`.

---

## Summary

This repo is the publishing control center:

- Obsidian is the private source of truth
- `content/` is the published content repo
- Quartz builds the website from `content/`
- every publish requires **two commits**:
  1. one in `content/`
  2. one in the main repo for the submodule pointer


# Quartz v4

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>
