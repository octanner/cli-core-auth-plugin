const axios = require('axios').default
const environments = require('./environments')

const verifyEnv = function (environment) {
  if (!environment) {
    throw new Error('The Environment was not passed')
  }

  var env = environments[environment.toLowerCase()]
  if (!env) {
    throw new Error(`The Environment passed: ${environment} does not exist`)
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

const buildAxiosWithEnvAndAuth = function (akkeris, environment) {
  return createAxiosWithAuth(verifyEnv(environment), akkeris.account)
}

module.exports = buildAxiosWithEnvAndAuth
