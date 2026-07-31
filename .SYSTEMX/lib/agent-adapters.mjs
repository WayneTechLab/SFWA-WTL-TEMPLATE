import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

export const AGENT_ADAPTERS = Object.freeze({
  'CLAUDE.md': '# Claude Code Instructions\n\n@AGENTS.md\n',
  'GEMINI.md': '# Gemini CLI Context\n\n@./AGENTS.md\n',
  '.github/copilot-instructions.md': '# GitHub Copilot Instructions\n\n@../AGENTS.md\n',
  '.cursor/rules/systemx.mdc': '---\ndescription: SFWA-WTL-G1 repository operating rules\nalwaysApply: true\n---\n\nFollow the canonical instructions in `AGENTS.md`.\n',
  '.windsurf/rules/systemx.md': '# SFWA-WTL-G1 Rules\n\nFollow the canonical repository instructions in `AGENTS.md`.\n',
  '.clinerules/systemx.md': '# SFWA-WTL-G1 Rules\n\nFollow the canonical repository instructions in `AGENTS.md`.\n',
  '.continue/rules/systemx.md': '---\nname: SFWA-WTL-G1 repository rules\n---\n\nFollow the canonical repository instructions in `AGENTS.md`.\n',
  '.junie/AGENTS.md': '# Junie Repository Instructions\n\nUse `../AGENTS.md` as the canonical repository instruction map.\n',
  '.amazonq/rules/systemx.md': '# SFWA-WTL-G1 Rules\n\nFollow the canonical repository instructions in `AGENTS.md`.\n',
})

export function syncAgentAdapters(rootDir, { check = false } = {}) {
  if (!existsSync(path.join(rootDir, 'AGENTS.md'))) throw new Error('AGENTS.md is required before agent adapters can be synchronized')
  const drift = []
  for (const [relativePath, expected] of Object.entries(AGENT_ADAPTERS)) {
    const target = path.join(rootDir, relativePath)
    const current = existsSync(target) ? readFileSync(target, 'utf8') : null
    if (current === expected) continue
    drift.push(relativePath)
    if (!check) {
      mkdirSync(path.dirname(target), { recursive: true })
      writeFileSync(target, expected, 'utf8')
    }
  }
  return drift
}
