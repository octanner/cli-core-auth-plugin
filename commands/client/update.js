const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function updateClient(appkit, args) {
  let task = appkit.terminal.task(`Updating Core Auth OAuth Client Credentials for ${args.app}-${args.space}.`);
  task.start();

  const app = typeof args.app === 'string' ? args.app.toLowerCase() : args.app
  const space = typeof args.space === 'string' ? args.space.toLowerCase() : args.space
  const type = typeof args.type === 'string' ? args.type.toUpperCase() : args.type
  const environment = typeof args.environment === 'string' ? args.environment.toLowerCase() : args.environment

  try {
    const authAxios = buildAxiosWithEnvAndAuth(appkit, environment);
    await authAxios.post(
      `/coreauth/client/update`,
      {
        app: app,
        ...(space ? { space: space } : {}),
        redirect_uris: args.post_login_url,
        returnto_uris: args.post_logout_url,
        type: type
      }
    );

    task.end('ok');
  } catch (err) {
    task.end('error');
    appkit.terminal.print(err.response && err.response.data.error ? err.response.data.error : err,
      'An error occured while attempting to update your Core-Auth OAuth Client\n'
    );
  }
}

module.exports = updateClient