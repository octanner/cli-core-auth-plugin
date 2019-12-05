const axios = require('axios').default
const environments = require('./environments')

const verifyEnv = function (environment) {
  if (!environment) {
    throw new Error('environment was not passed')
  }

  var env = environments[environment.toLowerCase()]
  if (!env) {
    throw new Error(`environment ${environment} does not exist`)
  }

  return env
}

const createAxiosWithAuth = function (env, account) {
  return axios.create({
    baseURL: env.url,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${account.password}`,
      'x-username': `${account.password}`
    }
  })
}

const buildAxiosWithEnvAndAuth = function (appkit, environment) {
  return createAxiosWithAuth(verifyEnv(environment), appkit.account)
}

module.exports = buildAxiosWithEnvAndAuth
