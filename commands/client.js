'use strict'

const create = require('./client/create')
const update = require('./client/update')
const deactivate = require('./client/deactivate')
const { remove } = require('./client/remove')
const regenerate = require('./client/regenerate')
const sharedArgs = require('../utils/shared-arguments')

module.exports = {
  init: akkeris => {
    akkeris.args
      .command(
        'coreauth:client:create',
        'Create OAuth2 Client credentials and assign them to the specified app',
        sharedArgs,
        create.bind(null, akkeris)
      )
      .command(
        'coreauth:client:deactivate',
        'Deactivate the OAuth Client and remove the config from the specified app',
        {
          app: sharedArgs.app,
          environment: sharedArgs.environment
        },
        deactivate.bind(null, akkeris)
      )
      .command(
        'coreauth:client:regenerate',
        'Regenerate the OAuth Client\'s \'client_secret\' and update the config for the specified app',
        {
          app: sharedArgs.app,
          environment: sharedArgs.environment
        },
        regenerate.bind(null, akkeris)
      )
      .command(
        'coreauth:client:remove',
        'Remove the OAuth Client configuration variables from the specified app (Does not deactivate OAuth Client)',
        {
          app: sharedArgs.app,
        },
        remove.bind(null, akkeris)
      )
      .command(
        'coreauth:client:update',
        'Update the OAuth Client and add/update the config for the specified app',
        sharedArgs,
        update.bind(null, akkeris)
      )
  },
  update: () => {},
  group: 'coreauth',
  help: 'Create or manage your App\'s OAuth Client & configuration with Core Auth',
  primary: false
}
