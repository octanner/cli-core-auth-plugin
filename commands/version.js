'use strict'

const { version } = require('../package.json')

const noop = () => {}

module.exports = {
  init: akkeris => {
    akkeris.args
      .command(
        'coreauth:version',
        `cli-core-auth-plugin v${version}`,
        {},
        noop.bind(null, akkeris)
      )
  },
  update: noop,
  group: 'coreauth',
  primary: false
}
