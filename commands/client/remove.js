'use strict';

const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function removeClient(appkit, args) {
  let task = appkit.terminal.task(`Removing Core Auth OAuth Client Credentials for ${args.app}-${args.space}.`);
  task.start();

  const app = typeof args.app === 'string' ? args.app.toLowerCase() : args.app
  const space = typeof args.space === 'string' ? args.space.toLowerCase() : args.space
  const environment = typeof args.environment === 'string' ? args.environment.toLowerCase() : args.environment

  try {
    const authAxios = buildAxiosWithEnvAndAuth(appkit, environment);
    await authAxios.post(
      '/coreauth/client/remove',
      {
        app: app,
        ...(space ? { space: space } : {})
      }
    );

    task.end('ok');
  } catch (err) {
    task.end('error');
    appkit.terminal.print(err.response && err.response.data.error ? err.response.data.error : err,
      'An error occured while attempting to remove your Core-Auth OAuth Client\n'
    );
  }
}

module.exports = {
  init(appkit) {
    const app = {
        alias: 'a',
        string: true,
        demand: true,
        description: 'An existing app that needs client credentials'
      },
      space = {
        alias: 's',
        string: true,
        demand: false,
        description: 'The space which the app belongs to (Production does not allow unsecure \'http\' URLs)'
      };

    appkit.args.command(
      'core:auth:client:remove',
      'Removes your client credentials from the config for the specified app',
      {
        app,
        space,
        environment
      },
      removeClient.bind(null, appkit)
    );
  },
  update() {
    // do nothing.
  },
  group: 'client',
  help: 'Removes your client credentials from the config for the specified app',
  primary: false
};
