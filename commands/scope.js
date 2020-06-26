'use strict'

const listScope = require('./scope/list')
const findScope = require('./scope/find')
const searchScope = require('./scope/search')
const sharedArgs = require('../utils/shared-arguments')

module.exports = {
  init: akkeris => {
    akkeris.args
      .command(
        'coreauth:scope:list',
        'List all active Scope(s) available to add to your App\'s OAuth Client',
        {
          environment: sharedArgs.environment
        },
        listScope.bind(null, akkeris)
      )
      .command(
        'coreauth:scope:list-by-feature-code',
        'Lists all scope(s) available by feature code',
        {
          featureCode: sharedArgs.featureCode,
          environment: sharedArgs.environment
        },
        findScope.bind(null, akkeris)
      )
      .command(
        'coreauth:scope:search',
        'Search for a scope by name',
        {
          scope: sharedArgs.scope,
          environment: sharedArgs.environment
        },
        searchScope.bind(null, akkeris)
      )
  },
  update: () => {},
  group: 'coreauth',
  help: 'List, find, and search available Scope(s) that can be added to an OAuth Client using Core Auth',
  primary: false
}
