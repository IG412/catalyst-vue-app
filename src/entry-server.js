import { makeApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = makeApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      context.rendered = () => {
        context.state = { ...store.state, ...context.state }
      }

      if (matchedComponents.length === 0) {
        let error = new Error('Not Found')
        error.code = 404
        return reject(error)
      }

      resolve(app)
    }, reject)
  })
}
