const buildAxiosWithEnvAndAuth = require('../../utils/auth-axios')

async function removeClient(appkit, args) {
  let task = appkit.terminal.task(`Removing Core Auth OAuth Client Credentials for ${args.app}-${args.space}.`);
  task.start();

  try {
    const authAxios = buildAxiosWithEnvAndAuth(appkit, args.environment);
    await authAxios.post(
      `/credentials/remove/${args.app}/${args.space}`
    );

    task.end('ok');
  } catch (err) {
    task.end('error');
    appkit.terminal.print(err.response && err.response.data.error ? err.response.data.error : err,
      'An error occured while attempting to remove your Core-Auth OAuth Client\n'
    );
  }
}

module.exports = removeClient