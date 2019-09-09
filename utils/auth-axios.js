const axios = require('axios')
const environments = require('./environments')

const verifyEnv = function (environment) {
  var env = environments[environment.toLowerCase()]
  if (!env) {
    throw new Error(`environment ${environment} does not exist`)
  }
  return env
}

const buildAxiosWithEnvAndAuth = function (appkit, environment) {
  var env = verifyEnv(environment)
  return axios.create({
    baseURL: env.url,
    headers: {
      Authorization: `Bearer ${appkit.account.password}`,
      'x-username': `${appkit.account.password}`
    }
  })
}

module.exports = buildAxiosWithEnvAndAuth
