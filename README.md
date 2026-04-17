# Quartz Site

This repository contains the Quartz site code.

## Structure

```text
quartz/
├─ quartz/              # Quartz core
├─ quartz-custom/       # Optional custom code
├─ content/             # Git submodule -> published content repo
├─ quartz.config.ts
├─ quartz.layout.ts
└─ package.json
```

## What lives here

- Quartz config and layout
- Theme/customization code
- Build and deploy setup
- The `content/` submodule pointer

## What does not live here

Published notes are stored in the separate `content/` repository.

## Clone

Clone with submodules:

```bash
git clone --recurse-submodules <repo-url>
```

If you already cloned it:

```bash
git submodule update --init --recursive
```

## Common workflow

### Update site config only

```bash
git add .
git commit -m "Update site config"
git push
```

### Update published content

```bash
cd content
git add .
git commit -m "Update content"
git push
```

Then return to the main repo and update the submodule pointer:

```bash
cd ..
git add content
git commit -m "Update content submodule pointer"
git push
```

## Local build

```bash
npx quartz build
```

Preview locally:

```bash
npx quartz build --serve
```

## Multi-device notes

On a new machine:

```bash
git clone --recurse-submodules <repo-url>
```

Before working on an existing clone:

```bash
git pull
git submodule update --init --recursive
```

## Common mistakes

- Editing `content/` but forgetting to commit inside `content/`
- Pushing `content/` but forgetting to commit the updated submodule pointer in the main repo
- Forgetting to initialize submodules on a new machine

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
