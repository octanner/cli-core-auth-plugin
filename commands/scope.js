'use strict'

const listScope = require('./scope/list')
const findScope = require('./scope/find')
const searchScope = require('./scope/search')
const addScope = require('./scope/add')
const removeScope = require('./scope/remove')
const sharedArgs = require('../utils/shared-arguments')

module.exports = {
  init: akkeris => {
    akkeris.args
      .command(
        'coreauth:client:scope:list',
        'List all active scopes available to add to your App\'s OAuth Client',
        {},
        listScope.bind(null, akkeris)
      )
      .command(
        'coreauth:client:scope:find',
        'Finds and returns all active scopes that belong to the specified feature',
        sharedArgs,
        findScope.bind(null, akkeris)
      )
      .command(
        'coreauth:client:scope:search',
        'Search for a scope and return it\'s details',
        sharedArgs,
        searchScope.bind(null, akkeris)
      )
      .command(
        'coreauth:client:scope:add',
        'Add scopes to your OAuth Client',
        {
          app: sharedArgs.app,
          scope: sharedArgs.scope,
          environment: sharedArgs.environment
        },
        addScope.bind(null, akkeris)
      )
      .command(
        'coreauth:client:scope:remove',
        'Remove scopes to your OAuth Client',
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
  help: 'Manage Scopes tied to your OAuth Client using Core Auth',
  primary: false
}
