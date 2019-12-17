'use strict'

const create = require('./client/create')
const update = require('./client/update')
const deactivate = require('./client/deactivate')
const { remove } = require('./client/remove')
const regenerate = require('./client/regenerate')
const sharedArgs = require('../utils/shared-arguments')

module.exports = {
  init (appkit) {
    appkit.args
      .command(
        'coreauth:client:create',
        'Create client credentials and assign them to the specified app',
        sharedArgs,
        create.bind(null, appkit)
      )
      .command(
        'coreauth:client:deactivate',
        'Deactivate client credentials and removes the config from the specified app',
        {
          app: sharedArgs.app,
          space: sharedArgs.space,
          environment: sharedArgs.environment
        },
        deactivate.bind(null, appkit)
      )
      .command(
        'coreauth:client:regenerate',
        'Regenerate your client_secret and update config for the specified app',
        {
          app: sharedArgs.app,
          space: sharedArgs.space,
          environment: sharedArgs.environment
        },
        regenerate.bind(null, appkit)
      )
      .command(
        'coreauth:client:remove',
        'Removes your client credentials from the config for the specified app',
        {
          app: sharedArgs.app,
          space: sharedArgs.space
        },
        remove.bind(null, appkit)
      )
      .command(
        'coreauth:client:update',
        'Update client credentials and config for the specified app',
        sharedArgs,
        update.bind(null, appkit)
      )
  },
  update () {
    // do nothing.
  },
  group: 'client',
  help: 'Manage your App\'s Core Auth Client Credentials and Configuration',
  primary: false
}
