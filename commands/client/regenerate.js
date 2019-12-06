const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

function regenerateClient (appkit, args) {
  const task = appkit.terminal.task(
    `Regenerating Core Auth OAuth Client Secret for ${args.app}-${args.space}`
  )
  task.start()

  let app = args.app.toLowerCase()
  const space = args.space && args.space.toLowerCase()
  const environment = args.environment.toLowerCase()

  /** Backwards compatability */
  if (space) app = app.includes(space) ? app : app + space

  const authAxios = buildAxiosWithEnvAndAuth(appkit, environment)
  authAxios.post('/coreauth/client/regenerate', {
    app
  })
    .then(() => task.end('ok'))
    .catch(err => {
      task.end('error')
      appkit.terminal.print(
        err.response && err.response.data.error ? err.response.data.error : err,
        'An error occured while attempting to regenerate the Core Auth OAuth Client Secret\n'
      )
    })
}

module.exports = regenerateClient
