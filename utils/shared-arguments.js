'use strict'

module.exports = {
  app: {
    alias: 'a',
    string: true,
    demand: true,
    description: 'app - An existing akkeris app that can securely store the OAuth Client credentials'
  },

  postLoginURL: {
    alias: 'r',
    string: true,
    demand: false,
    description:
        'redirect_uri - endpoint that your app will be listening on for an "authorization_code" once a user authenticates (Can be passed multiple times)'
  },

  postLogoutURL: {
    alias: 'l',
    string: true,
    demand: false,
    description:
        'returnto_uri - endpoint that your app will be listening on for a user to return to after logging out to log back in (Can be passed multiple times)'
  },

  scope: {
    alias: 's',
    string: true,
    demand: false,
    description:
        'scope - that will be searched for or added/removed from OAuth Clients (Can be passed multiple times)'
  },

  featureCode: {
    alias: 'f',
    string: true,
    demand: false,
    description:
        'feature_code - The feature code is used to search and returns scope(s) belonging to it'
  },

  type: {
    alias: 't',
    string: true,
    demand: true,
    description:
        'type - Choose one: [WEB|MOBILE|API|INTROSPECTION]. The type of OAuth Client your app needs will restrict it from authorizing on behalf of users or itself'
  },

  environment: {
    alias: 'e',
    string: true,
    demand: true,
    description:
        'environment - Choose one: [QA|STG|PRD]. Which Core environment will your app be connecting with? (Note: QA should be Core Team only)'
  }
}
