const { resolve } = require('path')
const { readFileSync } = require('fs')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')
const favicon = require('serve-favicon')
const redis = require('redis')
const validateEnv = require('valid-env')
const { renderVueApp } = require('./renderVueApp')
const { generateMeta } = require('./generateMeta')
const { getProjects } = require('./getProjects')
const dotenv = require('dotenv')

// Load config from server.env and ensure the correct values are set
// Will exit(1) if required variables are undefined
dotenv.config({ path: resolve(__dirname, '../server.env') })
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

const appName = `Not-Equal Catalyst`

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

  let project = projects.find(p => p.id === req.params.id)

  // If the project wasn't found, try another route
  if (!project) return next()

  // Render the project route, with specific metadata
  renderVueApp(req, res, renderer, {
    title: `${project.name} | Not-Equal Catalyst`,
    meta: generateMeta(req, 'Catalyst Project', [
      { property: 'og:description', content: project.name }
    ]),
    projects
  })
})

// Handle every other route by rendering the vue app
server.use('*', async (req, res) => {
  renderVueApp(req, res, renderer, {
    title: appName,
    meta: generateMeta(req, appName),
    projects: await getProjects(db)
  })
})

// Server entrypoint
;(async () => {
  // First connect to the redis server
  await new Promise((resolve, reject) => {
    db.on('ready', () => resolve())
    db.on('error', error => reject(error))
  })

  // Attach our express server to port 8080
  await new Promise((resolve, reject) => {
    server.listen(8080, err => {
      if (err) reject(err)
      else resolve()
    })
  })

  // Let the cli know we're running
  console.log('Listening on :8080')
})()
