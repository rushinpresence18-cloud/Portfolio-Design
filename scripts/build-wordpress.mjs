import { cp, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { build } from 'vite'

const projectRoot = process.cwd()
const pluginRoot = resolve(projectRoot, 'wordpress/rushin-portfolio')

await build({ configFile: resolve(projectRoot, 'vite.wordpress.config.js'), configLoader: 'runner' })
await mkdir(resolve(pluginRoot, 'public'), { recursive: true })
await cp(resolve(projectRoot, 'public'), resolve(pluginRoot, 'public'), { recursive: true })

console.log('WordPress plugin assets are ready in wordpress/rushin-portfolio.')
