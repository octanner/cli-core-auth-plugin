'use strict'

const client = require('./commands/client')
const remove = require('./commands/client/remove')
const regenerate = require('./commands/client/regenerate')

module.exports = {
  init: function (appkit) {
    client.init(appkit)
    remove.init(appkit)
    regenerate.init(appkit)
  },
  update: () => {
    // What do you want to do once the plugin has been updated,
    // this is executed AFTER the plugin has had the latest set of code
    // pulled, so its a "post" update operation.
  },
  group: 'coreauth',
  help: "Manage your App's Core Auth OAuth Client Credentials",
  primary: false
}
