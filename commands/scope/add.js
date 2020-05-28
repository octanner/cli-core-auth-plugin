'use strict'

const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  try {
    const app = args.app.toLowerCase()
    const scope = Array.isArray(args.scope) ? args.scope : [args.scope]
    scope.map(s => s.toLowerCase())
    const environment = args.environment.toLowerCase()
    const authAxios = axios(akkeris, environment)

    const task = akkeris.terminal.task(`Adding the following Scope(s) to ${args.app}: ${scope.split(', ')}`)
    task.start()

    return authAxios.post('/coreauth/scope/add', { app, scope })
      .then(scope => {
        task.end('ok')
        akkeris.terminal.message('Successfully added Scope(s) to the OAuth Client')
        akkeris.terminal.message('Current Scope(s) on this OAuth Client: ', scope.split(', '))
      })
      .catch(err => {
        task.end('error')
        akkeris.terminal.print(
          err.response && err.response.data.error ? err.response.data.error : err,
          'An error occured while attempting to add Scope(s) to the OAuth Client'
        )
      })
  } catch (err) {
    akkeris.terminal.error('An unexpected error has occurred.\n', err)
  }
}
