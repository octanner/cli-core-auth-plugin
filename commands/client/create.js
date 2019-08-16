const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function createClient(appkit, args) {
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

module.exports = createClient