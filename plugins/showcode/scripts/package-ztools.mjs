import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const packages = join(root, 'packages')
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'))
const archiveName = `${packageJson.name}-v${packageJson.version}.zip`
const archivePath = join(packages, archiveName)

if (!existsSync(join(dist, 'plugin.json'))) {
  throw new Error('dist/plugin.json not found. Run npm run build before packaging.')
}

mkdirSync(packages, { recursive: true })
rmSync(archivePath, { force: true })

execFileSync(
  'zip',
  [
    '-r',
    archivePath,
    '.',
    '-x',
    '*.DS_Store',
    '__MACOSX/*',
  ],
  {
    cwd: dist,
    stdio: 'inherit',
  }
)

console.log(`Packaged ZTools plugin: ${archivePath}`)
