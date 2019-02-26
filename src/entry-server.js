import { makeApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = makeApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ code: 404 })
      } else {
        resolve(app)
      }
    }, reject)
  })
}
