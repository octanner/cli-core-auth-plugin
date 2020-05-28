'use strict'

const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  try {
    const app = args.app.toLowerCase()
    const featureCode = args.featureCode.toLowerCase()
    const environment = args.environment.toLowerCase()
    const authAxios = axios(akkeris, environment)

    const task = akkeris.terminal.task(`Finding all active scopes with Feature Code: ${featureCode}`)
    task.start()

    return authAxios.post('/coreauth/scope/find', { app, featureCode })
      .then(scopes => {
        task.end('ok')
        const scopeTable = ['| Scope Name | Feature Code | Created On | Modified On |']
        scopeTable.push('| ---------- |:------------:| ------------:| ------------ :|')

        scopes.forEach(scope => {
          scopeTable.push(`| ${scope.scopeName} | ${scope.featureCode} | ${scope.createdOn} | ${scope.modifiedOn} |`)
        })

        akkeris.terminal.markdown(scopeTable.split('\n'))
      })
      .catch(err => {
        task.end('error')
        akkeris.terminal.print(
          err.response && err.response.data.error ? err.response.data.error : err,
          'An error occured while attempting to find Scope(s) belonging to the specified Feature Code'
        )
      })
  } catch (err) {
    akkeris.terminal.error('An unexpected error has occurred.\n', err)
  }
}
