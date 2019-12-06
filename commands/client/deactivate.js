const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')
const { removeConfig } = require('./remove')

function deactivateClient (appkit, args) {
  const clientTask = appkit.terminal.task(
    `Deactivating Core Auth OAuth Client Credentials for ${args.app}-${args.space}`
  )
  clientTask.start()

  const app = typeof args.app === 'string' ? args.app.toLowerCase() : args.app
  const space =
    typeof args.space === 'string' ? args.space.toLowerCase() : args.space
  const environment =
    typeof args.environment === 'string'
      ? args.environment.toLowerCase()
      : args.environment
  const appSpace = app.includes(space) ? app : app + space

  const authAxios = buildAxiosWithEnvAndAuth(appkit, environment)
  authAxios.post('/coreauth/client/deactivate', {
    app: appSpace,
    ...(space ? { space: space } : {})
  })
    .then(() => clientTask.end('ok'))
    .then(() => {
      const configTask = appkit.terminal.task(
        `Removing Core Auth Client Credentials Config for ${args.app}-${args.space}`
      )
      configTask.start()
      removeConfig(appkit, appSpace)
        .then(() => configTask.end('ok'))
        .catch(err => {
          configTask.end('error')
          appkit.terminal.print(
            err.response && err.response.data.error ? err.response.data.error : err,
            'An error occured while attempting to remove the Client Credentials Config from Akkeris\n'
          )
        })
    })
    .catch(err => {
      clientTask.end('error')
      appkit.terminal.print(
        err.response && err.response.data.error ? err.response.data.error : err,
        'An error occured while attempting to deactivate your Core Auth OAuth Client\n'
      )
    })
}

module.exports = deactivateClient
