# Changelog

## Unreleased

### Breaking Changes

  - Removed `space` option
    - Everyone has moved away from using it and keeping it has caused confusion
    - `-s` is now used for `Scope`

### New Features

  - Added `scope` commands for listening, finding, and searching available OAuth Scope(s)
    - `coreauth:scope:list` - List all active and available Scope(s) and their Feature Code
    - `coreauth:scope:find` - Find all active Scope(s) with a Customer Feature Code
    - `coreauth:scope:search` - Searches and returns the specified Scope(s) and their Feature Code
  - Added two additional `client` commands for managing an OAuth Client's Scope
    - `coreauth:client:add-scope` - Add Scope(s) to your App's OAuth Client
    - `coreauth:client:remove-scope` - Remove Scope(s) to your App's OAuth Client
  - Added `version` command for debugging
  - Added soft_error/warning messages to let users know they may be over-writing their config
  
### Internal/Docs
  
  - Updated help messages removing 'Core Auth' and sticking to just 'OAuth Client'
  - Core Auth may be more than just OAuth--this should help with future ambiguity
    - Core Auth OAuth Client sounds funny. Maybe 'Core OAuth Client'?
  - Updated package.json
    - Added private to prevent NPM publish
    - Added authors & maintainers
    - Updated packages
    - Removed license

## 2.0.0 / 2019-12-05

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

## 1.3.1 / 2019-09-03

- Updated Create command API route and new command routes
- Updated commands
  - `remove`
    - `type`, `environment` are no longer required
  - `regenerate`
    - `type` is no longer required

## 1.2.0 / 2019-08-16

- Added more Client commands to assist in maintaining Client credentials:
  - `remove` - Removes Client credentials from Akkeris Config only
  - `update` - Updates the Core Auth Client and Akkeris Config
  - `regenerate` - Regenerates the Apps Client Secret and updates Akkeris Config

## 1.1.3 / 2019-08-05

- Use symbolic link for `index.js` -> `dist/index.js`
- Update Scripts, removed `preversion`
- Update error handling

## 1.1.2 / 2019-08-05

- Using `ncc` for single file build

## 1.1.1 / 2019-07-30

- Updated Readme Examples
- Updated plugin help

## 1.1.0 / 2019-07-30

- Changed `redirect_uris` -> `post_login_url`
- Changed `returnto_uris` -> `post_logout_url`
  - *url* instead of *uris* because it should be a valid *url* and using the flag multiple times puts it into an array
- Updated readme to reflect changes in examples

## 1.0.2 / 2019-07-29

- Updated plugin name/group `core` -> `coreauth`

## 1.0.1 / 2019-07-29

- Updated messaging to be a task
- Updated help text
- Renamed `credentials.js` -> `client.js`

## 1.0.0 / 2019-07-29

- New plugin using latest Core Auth OAuth Client API
- Improved error handling
- Updated `axios@0.18.0`->`v0.19.0`
