const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')
const { removeConfig } = require('./remove')

function deactivateClient (appkit, args) {
  const clientTask = appkit.terminal.task(
    `Deactivating OAuth Client for ${args.app}`
  )
  clientTask.start()

  const app = args.app.toLowerCase()
  const environment = args.environment.toLowerCase()

  const authAxios = buildAxiosWithEnvAndAuth(appkit, environment)
  return authAxios.post('/coreauth/client/deactivate', { app })
    .then(() => clientTask.end('ok'))
    .then(() => {
      const configTask = appkit.terminal.task(
        `Removing OAuth Client config from ${args.app}`
      )
      configTask.start()
      return removeConfig(appkit, app)
        .then(() => configTask.end('ok'))
        .catch(err => {
          configTask.end('error')
          appkit.terminal.print(
            err.response && err.response.data.error ? err.response.data.error : err,
            'An error occured while attempting to remove the config from Akkeris'
          )
        })
    })
    .catch(err => {
      clientTask.end('error')
      appkit.terminal.print(
        err.response && err.response.data.error ? err.response.data.error : err,
        'An error occured while attempting to deactivate your OAuth Client'
      )
    })
}

module.exports = deactivateClient
