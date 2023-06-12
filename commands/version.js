'use strict'

const { version: packageVersion } = require('../package.json')

const noop = () => {}
const version = (_akkeris) => {
  console.log(`v${packageVersion}`)
}

module.exports = {
  init: akkeris => {
    akkeris.args
      .command(
        'coreauth:version',
        `cli-core-auth-plugin v${packageVersion}`,
        {},
        version.bind(null, akkeris)
      )
  },
  update: noop,
  group: 'coreauth',
  primary: false
}
