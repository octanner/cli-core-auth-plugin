'use strict'

const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  const app = args.app.toLowerCase()
  const scope = Array.isArray(args.scope) ? args.scope : [args.scope]
  scope.map(s => s.toLowerCase())
  const environment = args.environment.toLowerCase()
  const authAxios = axios(akkeris, environment)

  const task = akkeris.terminal.task(`Adding the following Scope(s) to ${args.app}: ${scope.join(', ')}`)
  task.start()

  return authAxios.post('/coreauth/client/addScope', { app, scope })
    .then(response => {
      task.end('ok')
      if (response.data.CORE_CLIENT_SCOPE) {
        const scopes = response.data.CORE_CLIENT_SCOPE.split(' ')
        const formatScopes = scopes.map(scopeName => {
          return ({
            scope_name: scopeName,
            status: scope.includes(scopeName) ? 'ADDED' : ''
          })
        })
        akkeris.terminal.table(formatScopes)
      }
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.print(err, 'An error occured while attempting to add Scope(s) to the OAuth Client')
    })
}
