'use strict'

const path = require('path')
const fs = require('fs')

let dir = path.join(__dirname, 'commands')

module.exports = {
  init:function(appkit) {
    fs.readdirSync(dir)
      .filter(f => path.extname(f) === '.js')
      .map(f => require('./commands/' + f).init(appkit))
  },
  update: () => {
    // What do you want to do once the plugin has been updated, 
    // this is executed AFTER the plugin has had the latest set of code
    // pulled, so its a "post" update operation.
  },
  'group': 'core',
  'help': 'Manage your App\'s Core Auth OAuth Client Credentials',
  'primary': false
} 

