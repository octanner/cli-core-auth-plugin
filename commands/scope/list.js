'use strict'

const R = require('ramda')

const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  // const limit = Number.parse(args.environment.limit)
  // const offset = Number.parse(args.environment.offset)
  const environment = args.environment.toLowerCase()
  const authAxios = axios(akkeris, environment)

  const task = akkeris.terminal.task('Getting list of all currently active Scope(s)')
  task.start()

  return authAxios.post('/coreauth/scope/list', {})
    .then(({ data: scopes }) => {
      const scopeTable = []
      // TODO: Sort scopes by scopeName or better yet, add option to sort
      const sortByScopeName = R.sortBy(R.compose(R.toLower, R.prop('scopeName')))
      const sortedScopes = sortByScopeName(scopes)
      R.forEach(scope => {
        scopeTable.push({ scopeName: scope.scopeName, featurecode: scope.featureCode, createdOn: scope.createdOn, modifiedOn: scope.modifiedOn })
      }, sortedScopes)

      task.end('ok')

      return scopeTable
    })
    .then(scopeTable => {
      akkeris.terminal.table(scopeTable)
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while getting the current list of active Scope(s)')
      akkeris.terminal.error(`${err.response.status} - ${err.response.data.name}: ${err.response.data.message}`)
    })
}
