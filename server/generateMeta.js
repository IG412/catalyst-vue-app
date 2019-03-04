function generateMeta(req, title, customMeta = []) {
  let tags = []

  const baseUrl = process.env.PUBLIC_URL

  const meta = [
    { property: 'og:title', content: title },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: baseUrl + '/public/favicon.png' },
    { property: 'og:url', content: baseUrl + req.url }
  ].concat(customMeta)

  for (let attrs of meta) {
    let tag = ['<meta']
    for (let attrName in attrs) {
      tag.push(`${attrName}="${attrs[attrName]}"`)
    }
    tags.push(tag.join(' ') + '>')
  }

  return tags.join('')
}

module.exports = { generateMeta }
