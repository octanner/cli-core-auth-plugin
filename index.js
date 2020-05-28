'use strict'

const client = require('./commands/client')
const scope = require('./commands/scope')

module.exports = {
  init: function (akkeris) {
    client.init(akkeris)
    scope.init(akkeris)
  },
  update: () => {},
  group: 'coreauth',
  help: 'Manage OAuth Clients & Scope using Core Auth (Create, Deactivate, Add, Remove)',
  primary: false
}
