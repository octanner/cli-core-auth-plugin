'use strict'

const client = require('./commands/client')

module.exports = {
  init: function (appkit) {
    client.init(appkit)
  },
  update: () => {
    // What do you want to do once the plugin has been updated,
    // this is executed AFTER the plugin has had the latest set of code
    // pulled, so its a "post" update operation.
  },
  group: 'coreauth',
  help: 'Manage your App\'s Core Auth Features',
  primary: true
}
