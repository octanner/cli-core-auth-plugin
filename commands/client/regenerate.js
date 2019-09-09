const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function regenerateClient(appkit, args) {
  let task = appkit.terminal.task(`Regenerating Core Auth OAuth Client Secret for ${args.app}-${args.space}.`);
  task.start();

  const app = typeof args.app === 'string' ? args.app.toLowerCase() : args.app
  const space = typeof args.space === 'string' ? args.space.toLowerCase() : args.space
  const environment = typeof args.environment === 'string' ? args.environment.toLowerCase() : args.environment

  try {
    const authAxios = buildAxiosWithEnvAndAuth(appkit, environment);
    await authAxios.post(
      '/coreauth/client/regenerate',
      {
        app: app,
        ...(space ? { space: space } : {}),
        redirect_uris: args.post_login_url,
        returnto_uris: args.post_logout_url,
      }
    );

    task.end('ok');
  } catch (err) {
    task.end('error');
    appkit.terminal.print(err.response && err.response.data.error ? err.response.data.error : err,
      'An error occured while attempting to regenerate the Core-Auth OAuth Client Secret\n'
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
      },
      environment = {
        alias: 'e',
        string: true,
        demand: true,
        description:
          '[QA|STG|PRD] describes which Core Auth environment the credentials will be created'
      };

      appkit.args.command(
        'core:auth:client:regeneratesecret',
        'Regenerate your client_secret and update config for the specified app',
        {
          app,
          space,
          environment
        },
        regenerateClient.bind(null, appkit)
      );
  },
  update() {
    // do nothing.
  },
  group: 'client',
  help: 'Regenerate your client_secret and update config for the specified app',
  primary: false
};
