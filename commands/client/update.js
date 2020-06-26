const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function updateClient (akkeris, args) {
  const task = akkeris.terminal.task(
    `Updating OAuth Client Credentials for ${args.app}`
  )
  task.start()

  const app = args.app.toLowerCase()
  const type = args.type.toUpperCase()
  const environment = args.environment.toLowerCase()

  const authAxios = buildAxiosWithEnvAndAuth(akkeris, environment)
  authAxios.post('/coreauth/client/update', {
    app: app,
    redirect_uris: args.postLoginURL,
    returnto_uris: args.postLogoutURL,
    type: type
  })
    .then(() => task.end('ok'))
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while attempting to update your OAuth Client')
      akkeris.terminal.error(`${err.response.status} - ${err.response.data.name}: ${err.response.data.message}`)
    })
}

module.exports = updateClient
