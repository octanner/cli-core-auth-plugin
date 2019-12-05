const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')
const remove = require('./remove')

async function deactivateClient (appkit, args) {
  const task = appkit.terminal.task(
    `Updating Core Auth OAuth Client Credentials for ${args.app}-${args.space}.`
  )
  task.start()

  const app = typeof args.app === 'string' ? args.app.toLowerCase() : args.app
  const space =
    typeof args.space === 'string' ? args.space.toLowerCase() : args.space
  const environment =
    typeof args.environment === 'string'
      ? args.environment.toLowerCase()
      : args.environment

  try {
    const authAxios = buildAxiosWithEnvAndAuth(environment)
    await authAxios.post('/coreauth/client/deactivate', {
      app: app,
      ...(space ? { space: space } : {})
    })

    await remove(appkit, args)

    task.end('ok')
  } catch (err) {
    task.end('error')
    appkit.terminal.print(
      err.response && err.response.data.error ? err.response.data.error : err,
      'An error occured while attempting to update your Core-Auth OAuth Client\n'
    )
  }
}

module.exports = deactivateClient
