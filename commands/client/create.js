'use strict'

const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')
const sharedConfig = require('../../utils/shared-config')

function createClient (akkeris, args) {
  const task = akkeris.terminal.task(`Creating OAuth Client for ${args.app}`)
  task.start()

  const app = args.app.toLowerCase()
  const type = args.type.toUpperCase()
  const environment = args.environment.toLowerCase()
  const authAxios = buildAxiosWithEnvAndAuth(akkeris, environment)

  return authAxios.post('/coreauth/client/create', {
    app: app,
    redirect_uris: args.postLoginURL,
    returnto_uris: args.postLogoutURL,
    type: type
  })
    .then(({ data }) => {
      if (!data) throw new Error('An error occured while attempting to create an OAuth Client')
      task.end('ok')
      return data
    })
    .then(data => {
      const configTask = akkeris.terminal.task(`Adding OAuth Client config to akkeris application: ${args.app}`)
      configTask.start()
      const config = {
        ...sharedConfig[environment],
        CORE_CLIENT_ID: data.clientId,
        CORE_CLIENT_SECRET: data.clientSecret || null,
        CORE_CLIENT_LOGIN_REDIRECT_URI: data.redirectUris.length ? data.redirectUris : null,
        CORE_CLIENT_LOGOUT_REDIRECT_URI: data.returntoUris.length ? data.returntoUris : null,
        CORE_CLIENT_SCOPE: data.scope.length ? data.scope.toString() : null,
        CORE_CLIENT_TYPE: data.type
      }
      console.log(JSON.stringify(config))
      return akkeris.api.patch(JSON.stringify(config), `/apps/${app}/config-vars`, (error, _data) => {
        if (error) {
          configTask.end('error')
          throw new Error('An error occured while attempting to update your akkeris config')
        }
        configTask.end('ok')

        // TODO: Remove null values
        if (environment === 'prd') {
          const { CORE_CLIENT_SECRET, ...rest } = config
          akkeris.terminal.vtable(rest)
        } else {
          akkeris.terminal.vtable(config)
        }
      })
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.error(err)
    })
}

module.exports = createClient
