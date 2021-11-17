'use strict'

module.exports = {
  app: {
    alias: 'n',
    string: true,
    demand: false,
    description: 'app - the akkeris app (i.e. "webapp-core-stg") or name/description of the OAuth Client. (i.e. "PA Print Manager - Team XYZ")'
  },

  postLoginURL: {
    alias: 'r',
    string: true,
    demand: false,
    description:
        'redirect_uri - an existing endpoint that your app will be listening on for "code" & "state" once a user authenticates (can be passed multiple times for multiple URIs)'
  },

  postLogoutURL: {
    alias: 'l',
    string: true,
    demand: false,
    description:
        'returnto_uri - an existing endpoint that your app will be listening on to start SP-Initaited SSO after a user logs out and they click "Log Back In" (can be passed multiple times for multiple URIs)'
  },

  scope: {
    alias: 's',
    string: true,
    demand: false,
    description:
        'scope - scope that should be added added or removed from the OAuth Client (Can be passed multiple times)'
  },

  customerId: {
    alias: 'c',
    string: true,
    demand: false,
    description:
      'customer_id - The customer ID/UUID that this OAuth Client will be scoped to and associated with'
  },

  featureCode: {
    alias: 'f',
    string: true,
    demand: false,
    description:
        'feature_code - the feature code that is associated with this OAuth Client and for filtering scope(s) belonging to it'
  },

  type: {
    alias: 't',
    string: true,
    demand: false,
    choices: ['WEB', 'MOBILE', 'API', 'EXTERNAL_API'],
    description:
        'type - Choose one: [WEB|MOBILE|API|EXTERNAL_API]. The type of OAuth Client your app needs will restrict it from authorizing on behalf of users or itself'
  },

  environment: {
    alias: 'e',
    string: true,
    demand: true,
    choices: ['LOCAL', 'local', 'QA', 'qa', 'STG', 'stg', 'PRD', 'prd'],
    description:
        'environment - Choose one: [QA|STG|PRD]. Which Core environment will your app be connecting with? (Note: QA would be the Core Team only)'
  }
}
