'use strict'

const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  const app = args.app.toLowerCase()
  const scope = Array.isArray(args.scope) ? args.scope : [args.scope]
  scope.map(s => s.toLowerCase())
  const environment = args.environment.toLowerCase()
  const authAxios = axios(akkeris, environment)

  const task = akkeris.terminal.task(`Removing the following Scope(s) from ${args.app}: ${scope.join(', ')}`)
  task.start()

  return authAxios.post('/coreauth/client/removeScope', { app, scope })
    .then(scope => {
      task.end('ok')
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while attempting to remove Scope(s) from the OAuth Client')
      akkeris.terminal.error(`${err.response.status} - ${err.response.data.name}: ${err.response.data.message}`)
    })
}
