const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function updateClient (appkit, args) {
  const task = appkit.terminal.task(
    `Updating OAuth Client Credentials for ${args.app}`
  )
  task.start()

  const app = args.app.toLowerCase()
  const type = args.type.toUpperCase()
  const environment = args.environment.toLowerCase()

  const authAxios = buildAxiosWithEnvAndAuth(appkit, environment)
  authAxios.post('/coreauth/client/update', {
    app: app,
    redirect_uris: args.postLoginURL,
    returnto_uris: args.postLogoutURL,
    type: type
  })
    .then(() => task.end('ok'))
    .catch(err => {
      task.end('error')
      appkit.terminal.print(
        err.response && err.response.data.error ? err.response.data.error : err,
        'An error occured while attempting to update your OAuth Client'
      )
    })
}

module.exports = updateClient
