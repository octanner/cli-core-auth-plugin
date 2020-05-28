'use strict'

const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  const app = args.app.toLowerCase()
  const scope = Array.isArray(args.scope) ? args.scope : [args.scope]
  scope.map(s => s.toLowerCase())
  const environment = args.environment.toLowerCase()
  const authAxios = axios(akkeris, environment)

  const task = akkeris.terminal.task(`Removing the following Scope(s) from ${args.app}: ${scope.split(', ')}`)
  task.start()

  return authAxios.post('/coreauth/scope/remove', { app, scope })
    .then(scope => {
      task.end('ok')
      akkeris.terminal.message('Successfully removed Scope(s) from the OAuth Client')
      akkeris.terminal.message('Current Scope(s) on this OAuth Client: ', scope.split(', '))
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.print(
        err.response && err.response.data.error ? err.response.data.error : err,
        'An error occured while attempting to remove Scope(s) from the OAuth Client'
      )
    })
}
