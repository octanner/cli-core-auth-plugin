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

async function create_core_auth_client(appkit, args) {
  let task = appkit.terminal.task(`Creating Core Auth OAuth Client Credentials for ${args.app}-${args.space}.`);
  task.start();

  try {
    const authAxios = buildAxiosWithEnvAndAuth(appkit, args.environment);
    await authAxios.post(
      `/credentials/addssotoapplication/${args.app}/${args.space}`,
      {
        redirect_uris: args.post_login_url,
        returnto_uris: args.post_logout_url,
        type: args.type
      }
    );

    task.end('ok');
  } catch (err) {
    task.end('error');
    appkit.terminal.print(err.response && err.response.data.error ? err.response.data.error : err,
      'An error occured while attempting to create a Core-Auth OAuth Client\n'
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
        description: 'The space which the app belongs to. Production requires "https" URLs'
      },
      post_login_url = {
        alias: 'r',
        string: true,
        demand: false,
        description:
          'URL that your app will be listening on for an "authorization_code" once a user authenticates. Can be passed multiple times'
      },
      post_logout_url = {
        alias: 'l',
        string: true,
        demand: false,
        description:
          'URL that the client can redirect a user to upon logging out of sessions. Can be passed multiple times'
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
      'core:auth:client:create',
      'Create client credentials and assign them to the specified app',
      {
        app,
        space,
        post_login_url,
        post_logout_url,
        type,
        environment
      },
      create_core_auth_client.bind(null, appkit)
    );
  },
  update() {
    // do nothing.
  },
  group: 'coreauth',
  help: 'Manage your Akkeris App\'s Core Auth OAuth Client Credentials',
  primary: true
};
