const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function regenerateClient(appkit, args) {
  let task = appkit.terminal.task(`Regenerating Core Auth OAuth Client Secret for ${args.app}-${args.space}.`);
  task.start();

  try {
    const authAxios = buildAxiosWithEnvAndAuth(appkit, args.environment);
    await authAxios.post(
      `/credentials/regenerate/${args.app}/${args.space}`,
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
      'An error occured while attempting to regenerate the Core-Auth OAuth Client Secret\n'
    );
  }
}

module.exports = regenerateClient