'use strict'

const client = require('./commands/client')

module.exports = {
  init: function (akkeris) {
    client.init(akkeris)
  },
  update: () => {},
  group: 'coreauth',
  help: 'Manage your App\'s OAuth Client credentials while keeping the configuration in sync with Core Auth',
  primary: false
}
