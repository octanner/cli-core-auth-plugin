const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

function regenerateClient (appkit, args) {
  const task = appkit.terminal.task(
    `Regenerating the OAuth Client Secret for ${args.app}`
  )
  task.start()

  let app = args.app.toLowerCase()
  const environment = args.environment.toLowerCase()

  const authAxios = buildAxiosWithEnvAndAuth(appkit, environment)
  authAxios.post('/coreauth/client/regenerate', { app })
    .then(() => task.end('ok'))
    .catch(err => {
      task.end('error')
      appkit.terminal.print(
        err.response && err.response.data.error ? err.response.data.error : err,
        'An error occured while attempting to regenerate the OAuth Client\'s secret'
      )
    })
}

module.exports = regenerateClient
