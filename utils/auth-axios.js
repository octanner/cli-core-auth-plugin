const axios = require('axios').default
const environments = require('./environments')

const verifyEnv = function (environment) {
  if (!environment) throw new ReferenceError('Missing Param: \'environment\'')
  const env = environments[environment.toLowerCase()]
  if (!env) throw new ReferenceError(`The Environment passed: ${environment} does not exist`)
  return env
}

const createAxiosWithAuth = (env, account) => axios.create({
  baseURL: env.url,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${account.password}`,
    'x-username': `${account.password}`
  }
})

module.exports = (akkeris, environment) => createAxiosWithAuth(verifyEnv(environment), akkeris.account)
