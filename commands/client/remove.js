'use strict'

const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')
const sharedArgs = require('../../utils/shared-arguments')

async function removeClient(appkit, args) {
  let task = appkit.terminal.task(
    `Removing Core Auth OAuth Client Credentials for ${args.app}-${args.space}.`
  )
  task.start()

  const app = typeof args.app === 'string' ? args.app.toLowerCase() : args.app
  const space =
    typeof args.space === 'string' ? args.space.toLowerCase() : args.space
  const environment =
    typeof args.environment === 'string'
      ? args.environment.toLowerCase()
      : args.environment

  try {
    const authAxios = buildAxiosWithEnvAndAuth(appkit, environment)
    await authAxios.post('/coreauth/client/remove', {
      app: app,
      ...(space ? { space: space } : {})
    })

    task.end('ok')
  } catch (err) {
    task.end('error')
    appkit.terminal.print(
      err.response && err.response.data.error ? err.response.data.error : err,
      'An error occured while attempting to remove your Core-Auth OAuth Client\n'
    )
  }
}

module.exports = {
  init(appkit) {
    appkit.args.command(
      'core:auth:client:remove',
      'Removes your client credentials from the config for the specified app',
      {
        app: sharedArgs.app,
        space: sharedArgs.space
      },
      removeClient.bind(null, appkit)
    )
  },
  update() {
    // do nothing.
  },
  group: 'client',
  help: 'Removes your client credentials from the config for the specified app',
  primary: false
}
