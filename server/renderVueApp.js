async function renderVueApp(req, res, renderer, context) {
  res.setHeader('Content-Type', 'text/html')

  context.url = req.url
  context.meta = context.meta || ''

  try {
    res.send(await renderer.renderToString(context))
  } catch (error) {
    console.log(error)
    if (error.url) {
      res.redirect(error.url)
    } else {
      // Render Error Page or Redirect
      res.status(error.code || 500).end(error.message)
      console.error(`error during render : ${req.url}`)
      console.error(error)
    }
  }
}

module.exports = { renderVueApp }
