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
  help: 'Create or manage your App\'s OAuth Client & configuration with Core Auth',
  primary: false
}
