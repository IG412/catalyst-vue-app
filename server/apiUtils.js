function redisGet(redis, key) {
  return new Promise(resolve => {
    redis.get(key, (error, data) => {
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

const getProjects = redis => redisGet(redis, 'projects')
const getContent = redis => redisGet(redis, 'content')

module.exports = { redisGet, getProjects, getContent }
