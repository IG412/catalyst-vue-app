const { resolve } = require('path')
const { readFileSync } = require('fs')

const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const templatePath = resolve(__dirname, 'src/index.template.html')
const template = readFileSync(templatePath, 'utf-8')
  .replace(/^\s+/gm, '')
  .replace(/\n/g, '')

const server = express()
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template,
  clientManifest
})

server.use('/js', express.static(resolve(__dirname, './dist/js')))
server.use('/img', express.static(resolve(__dirname, './dist/img')))
server.use('/css', express.static(resolve(__dirname, './dist/css')))

server.use('*', async (req, res) => {
  res.setHeader('Content-Type', 'text/html')

  const context = {
    title: 'Not Equal Catalyst',
    url: req.url,
    meta: `
      <meta name="test" value="lol">
    `.trim()
  }

  try {
    const html = await renderer.renderToString(context)
    res.send(html)
  } catch (error) {
    console.log(error)
    if (error.url) {
      res.redirect(error.url)
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(error.stack)
    }
  }
})

server.listen(8080, () => console.log('Listening on :8080'))
