'use strict'

function filterConfig (config) {
  return Object.keys(config)
    .filter((key) => key.startsWith('CORE_AUTH_'))
    .reduce((res, key) => ((res[key] = null), res), {}) // eslint-disable-line no-sequences
}

async function removeConfig (akkeris, app) {
  akkeris.api.get(`/apps/${app}/config-vars`)
    .then(appConfig => {
      if (!Object.keys(appConfig).length) throw new Error(app + ' does not have any configuration to remove')

      return filterConfig(appConfig)
    })
    .then(config => akkeris.api.patch(JSON.stringify(config), `/apps/${app}/config-vars`))
}

function removeClient (akkeris, args) {
  const task = akkeris.terminal.task(
    `Removing OAuth Client configuration from ${args.app}`
  )
  task.start()

  let app = args.app.toLowerCase()
  const space = args.space && args.space.toLowerCase()

  /** Backwards compatability */
  if (space) app = app.includes(space) ? app : app + space

  return removeConfig(akkeris, app)
    .then(() => task.end('ok'))
    .catch(err => {
      task.end('error')
      akkeris.terminal.error('An error occured while attempting to remove your Core Auth Configuration from Akkeris')
      akkeris.terminal.error(`${err.response.status} - ${err.response.data.name}: ${err.response.data.message}`)
    })
}

module.exports = {
  removeConfig,
  filterConfig,
  remove: removeClient
}
