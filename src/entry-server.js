import { makeApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = makeApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      context.rendered = () => {
        if (context.projects) {
          store.commit('set_projects', context.projects)
        }
        context.state = store.state
      }

      if (!matchedComponents.length) {
        let error = new Error('Not Found')
        error.code = 404
        reject(error)
      } else {
        resolve(app)
      }
    }, reject)
  })
}
