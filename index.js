'use strict'

const client = require('./commands/client')

module.exports = {
  init: function (akkeris) {
    client.init(akkeris)
  },
  update: () => {},
  group: 'coreauth',
  help: 'Create or manage your App\'s OAuth Client & configuration with Core Auth',
  primary: false
}
