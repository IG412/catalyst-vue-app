const express = require('express')

const { createRenderer } = require('vue-server-renderer')
const { readFileSync } = require('fs')
const makeApp = require('./src/entry-server')

// function makeWebApp(context) {
//   return new Vue({
//     data: {
//       url: context.url
//     },
//     template: `<div>The visited URL is: {{ url }}</div>`
//   })
// }

// in 2.5.0+, returns a Promise if no callback is passed:
// renderer
//   .renderToString(app)
//   .then(html => {
//     console.log(html)
//   })
//   .catch(err => {
//     console.error(err)
//   })

const server = express()
const renderer = createRenderer({
  template: readFileSync('dist/index.html', 'utf-8')
})

server.use('*', async (req, res) => {
  const webapp = makeApp({ url: req.url })
  const config = {
    title: 'Not Equal Catalyst',
    meta: `
      <meta name="test" value="lol">
    `
  }

  res.end(await renderer.renderToString(webapp, config))
})

server.listen(8080, () => console.log('Listening on :8080'))
