'use strict'

const createClient = require('./client/create')
const updateClient = require('./client/update')
const sharedArgs = require('../utils/shared-arguments')

module.exports = {
  init(appkit) {
    appkit.args
      .command(
        'core:auth:client:create',
        'Create client credentials and assign them to the specified app',
        sharedArgs,
        createClient.bind(null, appkit)
      )
      .command(
        'core:auth:client:update',
        'Update client credentials and config for the specified app',
        sharedArgs,
        updateClient.bind(null, appkit)
      )
  },
  update() {
    // do nothing.
  },
  group: 'client',
  help: "Manage your App's Core Auth Client Credentials and Configuration",
  primary: true
}
