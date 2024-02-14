[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Core Auth | cli-core-auth-plugin

## Usage

Maintains Core OAuth2 Clients for Web, Mobile, SPA, INTEGRATION, or APIs hosted on Akkeris

```zsh
coreauth
    |
    └ client
    |   add-scope
    |   create
    |   deactivate
    |   regenerate-secret
    |   remove
    |   remove-scope
    |   update
    └ scope
    |    list
    |    list-by-feature-code
    |    search
    └ version
```

## Check config

View your app in Akkeris or use:

```zsh
ak config -a {app_name}
```

**NOTE: Production values will still be [redacted].**

## Options

```zsh
$ ak help coreauth

Akkeris CLI Help

Coreauth
  • aka.js coreauth:client:add-scope            Add Scope(s) to your OAuth Client
  • aka.js coreauth:client:create               Create OAuth2 Client credentials and assign them to the specified app
  • aka.js coreauth:client:deactivate           Deactivate the OAuth Client and remove the config from the specified app
  • aka.js coreauth:client:regenerate           Deprecated: See 'coreauth:client:regenerate-secret'
  • aka.js coreauth:client:regenerate-secret    Regenerate the OAuth Client's 'client_secret' and update the config for the specified app
  • aka.js coreauth:client:remove               Remove the OAuth Client configuration variables from the specified app (Does not deactivate OAuth Client)
  • aka.js coreauth:client:remove-scope         Remove Scope(s) from your OAuth Client
  • aka.js coreauth:client:update               Update the OAuth Client and add/update the config for the specified app
  • aka.js coreauth:scope:list                  List all active Scope(s) available to add to your App's OAuth Client
  • aka.js coreauth:scope:list-by-feature-code  Lists all scope(s) available by feature code
  • aka.js coreauth:scope:search                Search for a scope by name
  • aka.js coreauth:version                     cli-core-auth-plugin v3.0.2
```

## Github

[cli-core-auth-plugin | Github](https://github.com/octanner/cli-core-auth-plugin)

## Install

Use Akkeris:

```zsh
ak plugins:install coreauth
```

Use HTTPS:

```zsh
ak plugins:install https://github.com/octanner/cli-core-auth-plugin
```

or via SSH:

```zsh
ak plugins:install git@github.com:octanner/cli-core-auth-plugin.git
```

## Developing

View the Akkeris help documentation here: https://docs.akkeris.io/extending-akkeris/creating-plugins.html

To edit the group, name, or other details, edit `plugin.js`.

To edit the existing commands or add to them, edit the respective command in `/commands`.

### Environment

Clone this repo: `git clone git@github.com:octanner/cli-core-auth-plugin.git`.

Add a symbolic link to the development folder you created: 

```zsh
ln -s {location of repo folder} ~/.akkeris/plugins/coreauth
```

**Note: `ak update` may fail when trying to update this plugin, that's expected.**

### Linting & Version Updates

Please run the following command to lint & format the code to StandardJS

```zsh
npm run lint
```

Then run:

```zsh
npm version {major|minor|patch}
```
