# Changelog

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
