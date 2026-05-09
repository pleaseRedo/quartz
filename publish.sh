#!/usr/bin/env bash
set -euo pipefail

# ====== Config ======
export OBSIDIAN_VAULT_PATH="${OBSIDIAN_VAULT_PATH:-/c/Users/jialin.yu/Documents/obsidian-sync}"
export QUARTZ_CONTENT_PATH="${QUARTZ_CONTENT_PATH:-/c/Users/jialin.yu/Downloads/quartz/content}"

CONTENT_COMMIT_MSG="${1:-Sync blog notes from vault}"
MAIN_COMMIT_MSG="${2:-Update content submodule pointer}"

# ====== Ensure we are in quartz repo root ======
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Quartz repo: $SCRIPT_DIR"
echo "==> OBSIDIAN_VAULT_PATH=$OBSIDIAN_VAULT_PATH"
echo "==> QUARTZ_CONTENT_PATH=$QUARTZ_CONTENT_PATH"

# ====== 1. Sync content from Obsidian vault ======
echo "==> Running content sync..."
node ./utils/content-sync/index.js

# ====== 2. Commit and push content repo ======
echo "==> Updating content submodule repo..."
cd ./content

git status

if [[ -n "$(git status --porcelain)" ]]; then
  git add .
  git commit -m "$CONTENT_COMMIT_MSG"
  git push
else
  echo "==> No content changes to commit."
fi

# ====== 3. Commit and push main repo submodule pointer ======
echo "==> Updating main repo pointer..."
cd ..

git status

if [[ -n "$(git status --porcelain content)" ]]; then
  git add content
  git commit -m "$MAIN_COMMIT_MSG"
  git push
else
  echo "==> No submodule pointer changes to commit."
fi

# ====== 4. Optional local build check ======
echo "==> Running local build..."
npx quartz build

echo "==> Done."
