'use strict'

const R = require('ramda')
const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  const featureCode = args.featureCode.toLowerCase()
  const environment = args.environment.toLowerCase()
  const authAxios = axios(akkeris, environment)

  const task = akkeris.terminal.task(`Finding all active scopes with Feature Code: ${featureCode}`)
  task.start()

  return authAxios.post('/coreauth/scope/findByFeatureCode', { featureCode })
    .then(({ data: scopes }) => {
      const scopeTable = []
      // TODO: Sort scopes by scopeName or better yet, add option to sort
      const sortByScopeName = R.sortBy(R.compose(R.toLower, R.prop('scopeName')))
      const sortedScopes = sortByScopeName(scopes)
      R.forEach(scope => {
        scopeTable.push({ scopeName: scope.scopeName, featurecode: scope.featureCode, createdOn: scope.createdOn, modifiedOn: scope.modifiedOn })
      }, sortedScopes)

      task.end('ok')

      akkeris.terminal.table(scopeTable)
    })
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while attempting to find Scope(s) belonging to the specified Feature Code')
      akkeris.terminal.error(`${err.response.status} - ${err.response.data.name}: ${err.response.data.message}`)
    })
}
