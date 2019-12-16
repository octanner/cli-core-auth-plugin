const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function updateClient (appkit, args) {
  const task = appkit.terminal.task(
    `Updating Core Auth OAuth Client Credentials for ${args.app}-${args.space}`
  )
  task.start()

  let app = args.app.toLowerCase()
  const space = args.space && args.space.toLowerCase()
  const type = args.type.toUpperCase()
  const environment = args.environment.toLowerCase()

  /** Backwards compatability */
  if (space) app = app.includes(space) ? app : app + space

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
        'An error occured while attempting to update your Core Auth OAuth Client\n'
      )
    })
}

module.exports = updateClient
