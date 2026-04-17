#!/usr/bin/env node

import fs from "fs-extra"
import path from "path"
import matter from "gray-matter"

class ContentSync {
  constructor(config) {
    this.config = {
      sourceVault: config.sourceVault,
      targetContent: config.targetContent,
      publishTag: (config.publishTag || "blog").toLowerCase(),
      skipDirs: new Set(config.skipDirs || [".obsidian", ".git", "node_modules", ".trash"]),
      preserveFiles: new Set(config.preserveFiles || ["README.md", "index.md"]),
      verbose: config.verbose ?? true,
    }
  }

  log(...args) {
    if (this.config.verbose) {
      console.log(...args)
    }
  }

  isMarkdownFile(filePath) {
    return path.extname(filePath).toLowerCase() === ".md"
  }

  shouldSkipDir(dirName) {
    return this.config.skipDirs.has(dirName)
  }

  shouldPreserveEntry(entryName) {
    return entryName === ".git" || this.config.preserveFiles.has(entryName)
  }

  normalizeTags(tags) {
    if (!tags) return []

    if (Array.isArray(tags)) {
      return tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean)
    }

    if (typeof tags === "string") {
      return tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean)
    }

    return []
  }

  async getMarkdownFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    let files = []

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        if (this.shouldSkipDir(entry.name)) {
          this.log(`Skipping directory: ${fullPath}`)
          continue
        }
        const subFiles = await this.getMarkdownFiles(fullPath)
        files = files.concat(subFiles)
      } else if (entry.isFile() && this.isMarkdownFile(fullPath)) {
        files.push(fullPath)
      }
    }

    return files
  }

  async shouldPublish(filePath) {
    try {
      const content = await fs.readFile(filePath, "utf8")
      const { data } = matter(content)
      const tags = this.normalizeTags(data.tags)
      return tags.includes(this.config.publishTag)
    } catch (error) {
      console.warn(`Failed to parse frontmatter: ${filePath}`)
      console.warn(error.message)
      return false
    }
  }

  async clearTargetDirectory() {
    this.log(`Clearing target directory: ${this.config.targetContent}`)

    const entries = await fs.readdir(this.config.targetContent, { withFileTypes: true })

    for (const entry of entries) {
      if (this.shouldPreserveEntry(entry.name)) {
        continue
      }

      const fullPath = path.join(this.config.targetContent, entry.name)
      await fs.remove(fullPath)
    }
  }

  async copyMarkdownFile(sourceFile) {
    const relativePath = path.relative(this.config.sourceVault, sourceFile)
    const destPath = path.join(this.config.targetContent, relativePath)

    await fs.ensureDir(path.dirname(destPath))
    await fs.copyFile(sourceFile, destPath)

    this.log(`Copied note: ${relativePath}`)
  }

  async copyAssetsFolderIfExists(sourceFile) {
    const sourceDir = path.dirname(sourceFile)
    const assetsDir = path.join(sourceDir, "assets")

    if (!(await fs.pathExists(assetsDir))) {
      return
    }

    const relativeAssetsPath = path.relative(this.config.sourceVault, assetsDir)
    const destAssetsDir = path.join(this.config.targetContent, relativeAssetsPath)

    await fs.ensureDir(path.dirname(destAssetsDir))
    await fs.copy(assetsDir, destAssetsDir, { overwrite: true })

    this.log(`Copied assets: ${relativeAssetsPath}`)
  }

  async sync() {
    this.log("Starting content sync...")
    this.log(`Source vault: ${this.config.sourceVault}`)
    this.log(`Target content: ${this.config.targetContent}`)
    this.log(`Publish tag: ${this.config.publishTag}`)

    if (!(await fs.pathExists(this.config.sourceVault))) {
      throw new Error(`Source vault does not exist: ${this.config.sourceVault}`)
    }

    await fs.ensureDir(this.config.targetContent)
    await this.clearTargetDirectory()

    const markdownFiles = await this.getMarkdownFiles(this.config.sourceVault)
    this.log(`Found ${markdownFiles.length} markdown files`)

    let publishedCount = 0

    for (const file of markdownFiles) {
      const publish = await this.shouldPublish(file)
      if (!publish) continue

      await this.copyMarkdownFile(file)
      await this.copyAssetsFolderIfExists(file)
      publishedCount += 1
    }

    this.log(`Done. Published ${publishedCount} notes.`)
  }
}

const config = {
  sourceVault: process.env.OBSIDIAN_VAULT_PATH,
  targetContent: process.env.QUARTZ_CONTENT_PATH,
  publishTag: "blog",
  skipDirs: [".obsidian", ".git", "node_modules", ".trash"],
  preserveFiles: ["README.md", "index.md"],
  verbose: true,
}

if (!config.sourceVault || !config.targetContent) {
  console.error("Missing required environment variables:")
  console.error("  OBSIDIAN_VAULT_PATH")
  console.error("  QUARTZ_CONTENT_PATH")
  process.exit(1)
}

const sync = new ContentSync(config)

sync.sync().catch((err) => {
  console.error("Content sync failed:")
  console.error(err)
  process.exit(1)
})