'use strict'

const create = require('./client/create')
const update = require('./client/update')
const deactivate = require('./client/deactivate')
const { remove } = require('./client/remove')
const regenerate = require('./client/regenerate')
const addScope = require('./client/addScope')
const removeScope = require('./client/removeScope')
const sharedArgs = require('../utils/shared-arguments')

module.exports = {
  init: akkeris => {
    akkeris.args
      .command(
        'coreauth:client:create',
        'Create OAuth2 Client credentials and assign them to the specified app',
        {
          app: sharedArgs.app,
          postLoginURL: sharedArgs.postLoginURL,
          postLogoutURL: sharedArgs.postLogoutURL,
          type: sharedArgs.type,
          environment: sharedArgs.environment
        },
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
        'coreauth:client:regenerate-secret',
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
          app: sharedArgs.app
        },
        remove.bind(null, akkeris)
      )
      .command(
        'coreauth:client:update',
        'Update the OAuth Client and add/update the config for the specified app',
        {
          app: sharedArgs.app,
          postLoginURL: sharedArgs.postLoginURL,
          postLogoutURL: sharedArgs.postLogoutURL,
          type: sharedArgs.type,
          environment: sharedArgs.environment
        },
        update.bind(null, akkeris)
      )
      .command(
        'coreauth:client:add-scope',
        'Add Scope(s) to your OAuth Client',
        {
          app: sharedArgs.app,
          scope: sharedArgs.scope,
          environment: sharedArgs.environment
        },
        addScope.bind(null, akkeris)
      )
      .command(
        'coreauth:client:remove-scope',
        'Remove Scope(s) from your OAuth Client',
        {
          app: sharedArgs.app,
          scope: sharedArgs.scope,
          environment: sharedArgs.environment
        },
        removeScope.bind(null, akkeris)
      )
  },
  update: () => {},
  group: 'coreauth',
  help: 'Manage OAuth Clients using Core Auth',
  primary: false
}
