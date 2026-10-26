import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'

const distDirectory = resolve('dist')
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

const server = createServer(async (request, response) => {
  let pathname
  try {
    pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
  } catch {
    response.writeHead(400).end('Bad request')
    return
  }

  let filePath = resolve(distDirectory, `.${pathname}`)
  if (filePath !== distDirectory && !filePath.startsWith(`${distDirectory}${sep}`)) {
    response.writeHead(403).end('Forbidden')
    return
  }

  try {
    let fileInfo = await stat(filePath)
    if (fileInfo.isDirectory()) {
      filePath = resolve(filePath, 'index.html')
      fileInfo = await stat(filePath)
    }
  } catch {
    if (extname(pathname)) {
      response.writeHead(404).end('Not found')
      return
    }
    filePath = resolve(distDirectory, 'index.html')
  }

  response.writeHead(200, {
    'Cache-Control': 'no-cache',
    'Content-Length': (await stat(filePath)).size,
    'Content-Type': mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  })

  if (request.method === 'HEAD') {
    response.end()
    return
  }

  createReadStream(filePath).pipe(response)
})

const port = Number(process.env.PORT) || 3000
server.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio server listening on port ${port}`)
})
