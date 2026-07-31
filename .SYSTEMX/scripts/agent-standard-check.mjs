#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()

const requiredFiles = [
  '.SYSTEMX/AI/README.md',
  '.SYSTEMX/AI/AGENT-MESH-STANDARD.md',
  '.SYSTEMX/AI/TOOLCALLING-AND-BROWSER-AUTOMATION.md',
  '.SYSTEMX/AI/EXTERNAL-SERVICE-CONNECTOR-STANDARD.md',
  '.SYSTEMX/AI/RECOVERY-PLAYBOOK.md',
  '.SYSTEMX/AI/agent-mesh.schema.json',
]

const requiredPhrases = new Map([
  ['.SYSTEMX/AI/AGENT-MESH-STANDARD.md', ['Agent 0', 'Message Envelope', 'Token Saving Rules']],
  ['.SYSTEMX/AI/TOOLCALLING-AND-BROWSER-AUTOMATION.md', ['Playwright', 'Chrome DevTools MCP', 'Popup And Apply-Block Handling']],
  ['.SYSTEMX/AI/EXTERNAL-SERVICE-CONNECTOR-STANDARD.md', ['Connector Contract', 'Fallback Ladder']],
  ['.SYSTEMX/AI/RECOVERY-PLAYBOOK.md', ['Port Recovery', 'Dead-Letter Entry']],
])

for (const relativeFile of requiredFiles) {
  const file = path.join(rootDir, relativeFile)
  if (!existsSync(file)) {
    throw new Error(`Missing SYSTEMX AI standard file: ${relativeFile}`)
  }
}

for (const [relativeFile, phrases] of requiredPhrases) {
  const contents = readFileSync(path.join(rootDir, relativeFile), 'utf8')
  for (const phrase of phrases) {
    if (!contents.includes(phrase)) {
      throw new Error(`Missing phrase "${phrase}" in ${relativeFile}`)
    }
  }
}

JSON.parse(readFileSync(path.join(rootDir, '.SYSTEMX/AI/agent-mesh.schema.json'), 'utf8'))

console.log('[SYSTEMX] AI standard check passed')
