function getProjects(redis) {
  return new Promise(resolve => {
    redis.get('projects', (error, data) => {
      try {
        if (error) throw error
        resolve(JSON.parse(data))
      } catch (error) {
        console.log(error)
        resolve(undefined)
      }
    })
  })
}

module.exports = { getProjects }
