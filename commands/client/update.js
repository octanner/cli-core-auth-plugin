const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function updateClient(appkit, args) {
  let task = appkit.terminal.task(`Updating Core Auth OAuth Client Credentials for ${args.app}-${args.space}.`);
  task.start();

  try {
    const authAxios = buildAxiosWithEnvAndAuth(appkit, args.environment);
    await authAxios.post(
      `/credentials/update/${args.app}/${args.space}`,
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
      'An error occured while attempting to update your Core-Auth OAuth Client\n'
    );
  }
}

module.exports = updateClient