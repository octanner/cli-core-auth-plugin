const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

function createClient (akkeris, args) {
  akkeris.terminal.print('Note: If your app is missing the client_secret configuration, this command will regenerate the client_secret and update the configuration in Akkeris.')
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
    .then((config) => {
      akkeris.terminal.format_objects((err, config) => {
        if (err) {
          akkeris.terminal.error(err)
          return task.end('error')
        }
        return config
      })
      return task.end('ok')
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while attempting to create an OAuth Client')
      akkeris.terminal.error(`${err.response.status} - ${err.response.data.name}: ${err.response.data.message}`)
    })
}

module.exports = createClient
