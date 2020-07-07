'use strict'

const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  const scope = Array.isArray(args.scope) ? args.scope[0] : args.scope
  const environment = args.environment.toLowerCase()
  const authAxios = axios(akkeris, environment)

  const task = akkeris.terminal.task(`Searching for the following Scope(s): ${scope.split(', ')}`)
  task.start()

  return authAxios.post('/coreauth/scope/findByName', { scopeName: scope })
    .then(({ data: scope = {} }) => {
      const scopeTable = []
      // TODO: Sort scopes by scopeName or better yet, add option to sort
      scopeTable.push({ scopeName: scope.scopeName, featurecode: scope.featureCode, createdOn: scope.createdOn, modifiedOn: scope.modifiedOn })

      task.end('ok')

      akkeris.terminal.table(scopeTable)
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while attempting to search for the specified Scope(s)')
      akkeris.terminal.error(`${err.response.status} - ${err.response.data.name}: ${err.response.data.message}`)
    })
}
