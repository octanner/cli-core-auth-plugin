const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function regenerateClient (appkit, args) {
  const task = appkit.terminal.task(
    `Regenerating Core Auth OAuth Client Secret for ${args.app}-${args.space}`
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
    const authAxios = buildAxiosWithEnvAndAuth(appkit, environment)
    await authAxios.post('/coreauth/client/regenerate', {
      app: app,
      ...(space ? { space: space } : {}),
      redirect_uris: args.postLoginURL,
      returnto_uris: args.postLogoutURL
    })

    task.end('ok')
  } catch (err) {
    task.end('error')
    appkit.terminal.print(
      err.response && err.response.data.error ? err.response.data.error : err,
      'An error occured while attempting to regenerate the Core Auth OAuth Client Secret\n'
    )
  }
}

module.exports = regenerateClient
