'use strict'

const axios = require('../../utils/auth-axios')

module.exports = (akkeris, args) => {
  try {
    const environment = args.environment.toLowerCase()
    const authAxios = axios(akkeris, environment)

    const task = akkeris.terminal.task('Getting list of all currently active Scope(s)')
    task.start()

    return authAxios.post('/coreauth/scope/list', {})
      .then(scopes => {
        task.end('ok')

        const scopeTable = ['| Scope Name | Feature Code | Created On | Modified On |']
        scopeTable.push('| ---------- |:------------:| ------------:| ------------ :|')

        // TODO: Sort scopes by scopeName or better yet, add option to sort
        scopes.forEach(scope => {
          scopeTable.push(`| ${scope.scopeName} | ${scope.featureCode} | ${scope.createdOn} | ${scope.modifiedOn} |`)
        })

        akkeris.terminal.markdown(scopeTable.split('\n'))
      })
      .catch(err => {
        task.end('error')
        akkeris.terminal.print(
          err.response && err.response.data.error ? err.response.data.error : err,
          'An error occured while getting the current list of active Scope(s)'
        )
      })
  } catch (err) {
    akkeris.terminal.error('An unexpected error has occurred.\n', err)
  }
}
