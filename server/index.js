const { resolve } = require('path')
const { readFileSync } = require('fs')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')
const favicon = require('serve-favicon')
const redis = require('redis')
const stoppable = require('stoppable')
const validateEnv = require('valid-env')
const { renderVueApp } = require('./renderVueApp')
const { generateMeta } = require('./generateMeta')
const { getProjects, getContent } = require('./apiUtils')
const dotenv = require('dotenv')

// Load config from server.env and ensure the correct values are set
// Will exit(1) if required variables are undefined
dotenv.config({ path: resolve(__dirname, '../.env.server.local') })
validateEnv(['REDIS_URL', 'PUBLIC_URL', 'API_URL'])

// Setup variables for our template
const templatePath = resolve(__dirname, 'index.template.html')
const template = readFileSync(templatePath, 'utf-8')
  .replace(/^\s+/gm, '')
  .replace(/\n/g, '')

// Setup a redis connection
const db = redis.createClient(process.env.REDIS_URL)

// Setup a renderer to render our vue app
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template,
  clientManifest
})

const appName = process.env.APP_NAME || `Not-Equal Catalyst`
const appInfo =
  process.env.APP_INFO || `Search, browse and find Not-Equal projects`
const apiUrl = process.env.API_URL
const baseState = { appName, apiUrl }
let httpServer = null

// Setup our express server
const server = express()
server.use(favicon('./public/favicon.png'))
server.use('/js', express.static(resolve(__dirname, '../dist/js')))
server.use('/img', express.static(resolve(__dirname, '../dist/img')))
server.use('/css', express.static(resolve(__dirname, '../dist/css')))
server.use('/public', express.static(resolve(__dirname, '../public')))

// Handle a project route specifically
server.get('/project/:id', async (req, res, next) => {
  let projects = await getProjects(db)
  let content = await getContent(db)

  let project = projects.find(p => p.id === req.params.id)

  // If the project wasn't found, try another route
  if (!project) return next()

  // Render the project route, with specific metadata
  renderVueApp(req, res, renderer, req.url, {
    title: `Project | Not-Equal Catalyst`,
    meta: generateMeta(req.url, 'Not-Equal Catalyst Project', [
      { property: 'og:description', content: project.name }
    ]),
    state: { ...baseState, content }
  })
})

// Handle every other route by rendering the vue app
server.use('*', async (req, res) => {
  let content = await getContent(db)

  renderVueApp(req, res, renderer, req.originalUrl, {
    title: appName,
    meta: generateMeta(req.originalUrl, appName, [
      { property: 'og:description', content: appInfo }
    ]),
    state: { ...baseState, content }
  })
})

// Server entrypoint
;(async () => {
  try {
    // First connect to the redis server
    await new Promise((resolve, reject) => {
      db.on('ready', () => resolve())
      db.on('error', error => reject(error))
    })

    // Attach our express server to port 8080
    await new Promise((resolve, reject) => {
      httpServer = server.listen(8080, err => {
        if (err) reject(err)
        else resolve()
      })
    })

    // Let the cli know we're running
    console.log('Listening on :8080')
  } catch (error) {
    console.log('Failed to startup', error.message)
    process.exit(1)
  }
})()

// Listen for process stop signals
const exit = async () => {
  console.log('\n Exiting cleanly')

  if (db) {
    console.log('Closing db')
    db.quit()
  }

  if (httpServer) {
    console.log('Stopping server')
    await new Promise(resolve => stoppable(httpServer).stop(resolve))
  }

  process.exit()
}
process.on('SIGINT', () => exit())
process.on('SIGTERM', () => exit())
