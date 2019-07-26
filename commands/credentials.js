'use strict';

var axios = require('axios');

var environments = {
  local: {
    url: 'http://localhost:3000'
  },
  qa: {
    url: 'https://ssoinject-core-qa.alamoapp.octanner.io'
  },
  stg: {
    url: 'https://ssoinject-core-stg.alamoapp.octanner.io'
  },
  prd: {
    url: 'https://ssoinject-core-prd.alamoapp.octanner.io'
  }
};

const verifyEnv = function(environment) {
  var env = environments[environment.toLowerCase()];
  if (!env) {
    throw new Error(`environment ${environment} does not exist`);
  }
  return env;
};

const buildAxiosWithEnvAndAuth = function(appkit, environment) {
  var env = verifyEnv(environment);
  return axios.create({
    baseURL: env.url,
    headers: {
      Authorization: `Bearer ${appkit.account.password}`,
      'x-username': `${appkit.account.password}`
    }
  });
};

async function create_core_auth_credentials(appkit, args) {
  const authAxios = buildAxiosWithEnvAndAuth(appkit, args.environment);
  try {
    await authAxios.post(
      `/credentials/addssotoapplication/${args.app}/${args.space}`,
      {
        redirect_uris: args.redirect_uris,
        returnto_uris: args.returnto_uris,
        type: args.type
      }
    );
    console.log(
      `Successfully added Core-Auth OAuth Client Credentials to ${args.app} in ${args.space}`
    );
  } catch (err) {
    console.log(
      'An error occured while attempting to create a Core-Auth OAuth Client:\n',
      err
    );
  }
}

module.exports = {
  init(appkit) {
    const app = {
        alias: 'a',
        string: true,
        demand: true,
        description: 'An existing app that needs core auth credentials'
      },
      space = {
        alias: 's',
        string: true,
        description: 'The space which the app belongs to'
      },
      redirect_uris = {
        alias: 'r',
        string: true,
        demand: false,
        description:
          'Redirect URIs for client apps with a UI only. Service apps do not need redirect URIs as they will not be using user authentication'
      },
      returnto_uris = {
        alias: 'l',
        string: true,
        demand: false,
        description:
          'Post logout redirect URIs, URLs that the client can redirect a user to after logging out'
      },
      type = {
        alias: 't',
        string: true,
        demand: true,
        description:
          '[WEB|MOBILE|API] which describes the Type of OAUTH Client your app needs'
      },
      environment = {
        alias: 'e',
        string: true,
        description:
          '[qa|stg|prd] describes which Core Auth environment the credentials will be created'
      };

    appkit.args.command(
      'core:auth:credentials:create',
      'Create client credentials and assign them to the specified app',
      {
        app,
        space,
        redirect_uris,
        returnto_uris,
        type,
        environment
      },
      create_core_auth_credentials.bind(null, appkit)
    );
  },
  update() {
    // do nothing.
  },
  group: 'core',
  help: 'Manage your app\'s Core-Auth OAuth Client Credentials',
  primary: true
};
