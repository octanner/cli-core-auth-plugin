const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

function regenerateClient (akkeris, args) {
  const task = akkeris.terminal.task(
    `Regenerating the OAuth Client Secret for ${args.app}`
  )
  task.start()

  const app = args.app.toLowerCase()
  const environment = args.environment.toLowerCase()

  const authAxios = buildAxiosWithEnvAndAuth(akkeris, environment)
  authAxios.post('/coreauth/client/regenerate', { app })
    .then(() => task.end('ok'))
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while attempting to regenerate the OAuth Client\'s secret', err)
    })
}

module.exports = regenerateClient
