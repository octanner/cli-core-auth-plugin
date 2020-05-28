const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

function createClient (akkeris, args) {
  const task = akkeris.terminal.task(
    `Creating OAuth Client for ${args.app}`
  )
  task.start()

  const app = args.app.toLowerCase()
  const type = args.type.toUpperCase()
  const environment = args.environment.toLowerCase()
  const authAxios = buildAxiosWithEnvAndAuth(akkeris, environment)

  akkeris.terminal.soft_error('Note: If your app has any config missing, this command would effectively regenerate the client_secret.')
  return akkeris.terminal.confirm('Would you like to continue?')
    .then(answer => {
      akkeris.terminal.message('You selected: ', answer)
      return authAxios.post('/coreauth/client/create', {
        app: app,
        redirect_uris: args.postLoginURL,
        returnto_uris: args.postLogoutURL,
        type: type
      })
        .then(() => task.end('ok'))
        .catch(err => {
          task.end('error')
          akkeris.terminal.print(
            err.response && err.response.data.error ? err.response.data.error : err,
            'An error occured while attempting to create an OAuth Client'
          )
        })
    })
}

module.exports = createClient
