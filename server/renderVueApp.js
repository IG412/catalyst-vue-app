async function renderVueApp(req, res, renderer, url, context) {
  res.setHeader('Content-Type', 'text/html')

  console.log(url)

  context.url = url
  context.meta = context.meta || ''
  context.apiUrl = process.env.API_URL

  try {
    res.end(await renderer.renderToString(context))
  } catch (error) {
    console.log(error)
    if (error.url) {
      res.redirect(error.url)
    } else {
      // Render Error Page or Redirect
      res.status(error.code || 500).end(error.message)
      console.error(`error during render : ${url}`)
      console.error(error)
    }
  }
}

module.exports = { renderVueApp }
