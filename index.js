'use strict'

const client = require('./commands/client')
const scope = require('./commands/scope')
const version = require('./commands/version')

module.exports = {
  init: function (akkeris) {
    client.init(akkeris)
    scope.init(akkeris)
    version.init(akkeris)
  },
  update: () => {},
  group: 'coreauth',
  help: 'Manage OAuth Clients & Scope using Core Auth (Create, Deactivate, Add, Remove)',
  primary: false
}
