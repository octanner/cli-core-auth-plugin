const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

function createClient (akkeris, args) {
  akkeris.terminal.soft_error('* Note: If your app exists in the selected environment, but is missing the CLIENT_SECRET config, this command will regenerate the CLIENT_SECRET and update the config! *')
  const task = akkeris.terminal.task(`Creating an OAuth Client for: ${args.app}`)

  const app = args.app.toLowerCase()
  const type = args.type.toUpperCase()
  const environment = args.environment.toLowerCase()
  const authAxios = buildAxiosWithEnvAndAuth(akkeris, environment)

  task.start()
  return authAxios.post('/coreauth/client/create', {
    app,
    redirect_uris: args.postLoginURL,
    returnto_uris: args.postLogoutURL,
    type
  })
    .then(response => {
      task.end('ok')
      akkeris.terminal.vtable(response.data)
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while attempting to create an OAuth Client', err)
    })
}

module.exports = createClient
