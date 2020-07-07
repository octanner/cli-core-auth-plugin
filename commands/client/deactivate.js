const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')
const { removeConfig } = require('./remove')

function deactivateClient (akkeris, args) {
  const task = akkeris.terminal.task(
    `Deactivating OAuth Client for ${args.app}`
  )
  task.start()

  const app = args.app.toLowerCase()
  const environment = args.environment.toLowerCase()

  const authAxios = buildAxiosWithEnvAndAuth(akkeris, environment)
  return authAxios.post('/coreauth/client/deactivate', { app })
    .then(() => task.end('ok'))
    .then(() => {
      const configTask = akkeris.terminal.task(
        `Removing OAuth Client config from ${args.app}`
      )
      configTask.start()
      return removeConfig(akkeris, app)
        .then(() => configTask.end('ok'))
        .catch(err => {
          task.end('error')
          akkeris.terminal.error('An error occured while attempting to remove the config from Akkeris')
          akkeris.terminal.error(`${err.response.status} - ${err.response.data.name}: ${err.response.data.message}`)
        })
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while attempting to deactivate your OAuth Client')
      akkeris.terminal.error(`${err.response.status} - ${err.response.data.name}: ${err.response.data.message}`)
    })
}

module.exports = deactivateClient
