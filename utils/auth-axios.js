const axios = require('axios').default
const environments = require('./environments')

const verifyEnv = function (environment) {
  if (!environment) throw new Error('The Environment was not passed')

  const env = environments[environment.toLowerCase()]
  if (!env) throw new Error(`The Environment passed: ${environment} does not exist`)

  return env
}

const createAxiosWithAuth = (env, account) => axios.create({
  baseURL: env.url,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${account.password}`,
    'x-username': `${account.password}`
  }
})

module.exports = (akkeris, environment) => createAxiosWithAuth(verifyEnv(environment), akkeris.account)
