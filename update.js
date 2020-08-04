/**
 * When a plugin is updated, the following happens:
 *
 *  - `git pull` is ran in the plugin's root directory.
 *  - If an `update.js` file is found in the root directory, it is ran (and not exported).
 *  - If an `update` function is exported by `index.js`, it is called with the akkeris object.
 *
 * The update.js file is a great place to install new dependencies that are needed by index.js after updating
 *  - for example, you can run npm install (like the install.js example in the installation section).
 */
const proc = require('child_process')

const isWindows = process.platform === 'win32'

proc.spawnSync('npm', ['install'], {
  cwd: __dirname, env: process.env, stdio: 'ignore', shell: isWindows || undefined
})
