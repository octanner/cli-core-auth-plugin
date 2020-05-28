'use strict'

const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  try {
    const app = args.app.toLowerCase()
    const scope = Array.isArray(args.scope) ? args.scope : [args.scope]
    scope.map(s => s.toLowerCase())
    const environment = args.environment.toLowerCase()
    const authAxios = axios(akkeris, environment)

    const task = akkeris.terminal.task(`Searching for the following Scope(s): ${scope.split(', ')}`)
    task.start()

    return authAxios.post('/coreauth/scope/search', { app, scope })
      .then(scopes => {
        task.end('ok')

        const scopeTable = ['| Scope Name | Feature Code | Created On | Modified On |']
        scopeTable.push('| ---------- |:------------:| ------------:| ------------ :|')

        scopes.forEach(scope => {
          scopeTable.push(`| ${scope.scopeName} | ${scope.featureCode} | ${scope.createdOn} | ${scope.modifiedOn} |`)
        })
      })
      .catch(err => {
        task.end('error')
        akkeris.terminal.print(
          err.response && err.response.data.error ? err.response.data.error : err,
          'An error occured while attempting to search for the specified Scope(s)'
        )
      })
  } catch (err) {
    akkeris.terminal.error('An unexpected error has occurred.\n', err)
  }
}
