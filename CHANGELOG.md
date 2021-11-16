# Changelog

## [v4.0.0](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v4.0.0) / 2021-11-16

### Breaking Changes

- Removed the following deprecated config from being added/updated/removed:
  - `CORE_AUTH_CLIENT_ID`, please use `CORE_CLIENT_ID` instead
  - `CORE_AUTH_CLIENT_SECRET`, please use `CORE_CLIENT_SECRET` instead
  - `CORE_AUTH_POST_LOGIN_URIS`, please use `CORE_CLIENT_LOGIN_REDIRECT_URI` instead
  - `CORE_AUTH_POST_LOGOUT_URIS`, please use `CORE_CLIENT_LOGOUT_REDIRECT_URI` instead
- Added Core Auth Internal URLS to be either created or updated (if it already exists):
  - `CORE_AUTHORIZATION_URL`
  - `CORE_TOKEN_URL`
  - `CORE_INTROSPECTION_URL`
  - `CORE_REVOCATION_URL`
  - `CORE_JWKS_URL`

### Features

- Call Core-SSO directly instead of Akkeris-Credential-Injector

### Internal

- Cleaned up the arguments help
- Updated readme
- Updated ramda library

## [v3.0.4](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v3.0.3) / 2021-03-04

### Internal

- Updated Axios

## [v3.0.3](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v3.0.3) / 2020-08-03

### Internal

- Added `update.js` to handle the npm install after updating
- Updated help text
- Updated readme
- Updated ramda library

## [v3.0.2](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v3.0.2) / 2020-07-08

### Internal

- removed `type: module` from package.json which threw for NodeJS versions >=v14
- Reverted `primary: false` to `true` for the plugin

## [v3.0.1](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v3.0.1) / 2020-07-07

### Interna

- Added `install.js` per Akkeris team instructions
- Fixed changelog version number `v1.2.0` -> `v1.3.0`

## [v3.0.0](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v3.0.0) / 2020-07-07

### Breaking Changes

**- Removed GitFlow and thus made `master` the default branch**
  - If you have issues or errors upon updating, please try the following:
    ```zsh
    aka plugins:uninstall coreauth && \
    aka plugins:install coreauth
    ```
  - If that doesn't work, you may have to just switch the git branch:
    ```zsh
    cd ~/.akkeris/plugins/coreauth && \
    git checkout master && \
    aka update
    ```
**- Removed `-s --space` option**
  - Everyone has moved away from using it and keeping it has caused confusion
  - `-s` is now used for `--scope`
**- Removed the `ncc` library which may require plugin reinstall**
  - [ncc](https://github.com/vercel/ncc) is a simple CLI for compiling a Node.js module into a single file, together with all its dependencies, gcc-style.
  - Required a build every commit to `master` to execute the latest code
  - Found it wasn't necessary and the `npm i` that `akkeris` runs is fine for our application.

### New Features

- Added `scope` commands for listing, finding, and searching available OAuth Scope(s) by several methods:
  - `coreauth:scope:list` - List all active and available Scope(s) and their Feature Code
    - Takes arguments:
      - `-e` or `--environment`
    - This is limited to the first 100 scopes, currently there's not many scopes. I'll improve this on the next iteration.
  - `coreauth:scope:list-by-feature-code` - List all active Scope(s) from a specified Feature Code
    - Takes arguments:
      - `-f` or `--featureCode`
      - `-e` or `--environment`
  - `coreauth:scope:search` - Searches for a Scope by it's name. (i.e. "identity")
    - Takes arguments:
      - `-s` or `--scope`
      - `-e` or `--environment`
- Added two additional `client` commands for managing an OAuth Client's Scope
  - `coreauth:client:add-scope` - Add Scope(s) to your App's OAuth Client
    - Takes arguments:
      - `-a` or `--app`
      - `-s` or `--featureCode`
      - `-e` or `--environment`
  - `coreauth:client:remove-scope` - Remove Scope(s) to your App's OAuth Client
    - Takes arguments:
      - `-a` or `--app`
      - `-s` or `--featureCode`
      - `-e` or `--environment`
- Added `coreauth:version` command for easier debugging
- Added warning **NOTE** message to let users know they may be regenerating their client_secret if it's missing from the config

### Internal
  
  - Updated help messages removing 'Core Auth' and using 'OAuth Client' instead
    - Core Auth may be more than just OAuth--this should help with future ambiguity
    - Core Auth OAuth Client sounds funny. _Maybe **'Core OAuth Client'**?_
  - Updated package.json
    - Added private to prevent NPM publish
    - Added authors & maintainers
    - Updated packages
    - Removed license

## [v2.0.1](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v2.0.1) / 2020-06-03

- Updated package dependencies to latest
- Moved development linter from `prettier-standard` -> `standardJS`

## [v2.0.0](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v2.0.0) / 2019-12-05

- Added Deactivate Client command for deactivating a client and removing it from Akkeris
  - `deactivate`
    - `app`, `environment` are required
- Refactored to use appkit instead for akkeris config
- Updated responses/tasks
- Reformatting using standardJS

### DEPRECATIONS

- Removed requiring the **space**, add it to the **app** instead
  - i.e. Use `-a ccap-core-dev` instead of `-a ccap -s core-dev` 
- Renamed commands from `core:auth...` -> `coreauth:...`
  - i.e. Use `coreauth:client:deactivate -a ccap-core-dev` instead of `core:auth:client:deactivate -a ccap-core-dev`
- Update using the flag `--post_login_url` -> `--postLoginURL`
- Update using the flag `--post_logout_url` -> `--postLogoutURL`

## [v1.3.1](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v1.3.1) / 2019-09-03

- Updated Create command API route and new command routes
- Updated commands
  - `remove`
    - `type`, `environment` are no longer required
  - `regenerate`
    - `type` is no longer required

## [v1.3.0](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v1.3.0) / 2019-08-16

- Added more Client commands to assist in maintaining Client credentials:
  - `remove` - Removes Client credentials from Akkeris Config only
  - `update` - Updates the Core Auth Client and Akkeris Config
  - `regenerate` - Regenerates the Apps Client Secret and updates Akkeris Config

## [v1.1.3](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v1.1.3) / 2019-08-05

- Use symbolic link for `index.js` -> `dist/index.js`
- Update Scripts, removed `preversion`
- Update error handling

## [v1.1.2](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v1.1.2) / 2019-08-05

- Using `ncc` for single file build

## [v1.1.1](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v1.1.1) / 2019-07-30

- Updated Readme Examples
- Updated plugin help

## [v1.1.0](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v1.1.0) / 2019-07-30

- Changed `redirect_uris` -> `post_login_url`
- Changed `returnto_uris` -> `post_logout_url`
  - *url* instead of *uris* because it should be a valid *url* and using the flag multiple times puts it into an array
- Updated readme to reflect changes in examples

## [v1.0.2](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v1.0.2) / 2019-07-29

- Updated plugin name/group `core` -> `coreauth`

## [v1.0.1](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v1.0.1) / 2019-07-29

- Updated messaging to be a task
- Updated help text
- Renamed `credentials.js` -> `client.js`

## [v1.0.0](https://github.com/octanner/cli-core-auth-plugin/releases/tag/v1.0.0) / 2019-07-29

- New plugin using latest Core Auth OAuth Client API
- Improved error handling
- Updated `axios@0.18.0`->`v0.19.0`
