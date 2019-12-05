'use strict'

function filterConfig (config) {
  return Object.keys(config)
    .filter((key) => key.startsWith('CORE_AUTH_'))
    .reduce((res, key) => ((res[key] = null), res), {}) // eslint-disable-line no-sequences
}

async function removeClient (appkit, args) {
  const task = appkit.terminal.task(
    `Removing Core Auth OAuth Client Credentials for ${args.app}-${args.space}.`
  )
  task.start()

  const app = typeof args.app === 'string' ? args.app.toLowerCase() : args.app
  const space =
    typeof args.space === 'string' ? args.space.toLowerCase() : args.space
  const appSpace = app.includes(space) ? app : app + space

  appkit.api.get(`/apps/${app}/config-vars`)
    .then(appConfig => {
      if (!Object.keys(appConfig).length) {
        throw new Error(app + ' does not have any configuration to remove\n')
      }

      return filterConfig(appConfig)
    })
    .then(config => {
      appkit.api.patch(JSON.stringify(config), `/apps/${appSpace}/config-vars`)
        .then(response => {
          task.end('ok')
        })
        .catch(err => {
          if (err) throw err
        })
    })
    .catch(err => {
      console.error(err)
      task.end('error')
      appkit.terminal.print(
        err.response && err.response.data.error ? err.response.data.error : err,
        'An error occured while attempting to remove your Core-Auth OAuth Client\n'
      )
    })
}

module.exports = removeClient
