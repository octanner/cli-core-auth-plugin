[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Core | Auth | cli-core-auth-plugin

## Usage

Maintains Core OAuth2 Clients for Web, Mobile, or APIs hosted on Akkeris

- Clients
  - create
  - update
  - regenerate (generates and updates env-config with a new client_secret)
  - deactivate (disables client, useful for preview apps & compromised clients)
  - remove config from Akkeris env-config (does not deactivate)

## Check config

View your app in Akkeris or use 

```zsh
ak config -a {app_name}
```

## Options

```zsh
$ ak help coreauth

Akkeris CLI Help

Coreauth
  • aka.js coreauth:client:create      Create client credentials and assign them to the specified app
  • aka.js coreauth:client:deactivate  Deactivate client credentials and removes the config from the specified app
  • aka.js coreauth:client:regenerate  Regenerate your client_secret and update config for the specified app
  • aka.js coreauth:client:remove      Removes your client credentials from the config for the specified app
  • aka.js coreauth:client:update      Update client credentials and config for the specified app
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

To edit the group, name, or other details, edit `plugin.js`.

To edit the existing commands or add to them, edit the respective command in `/commands`.

### Environment

Clone this repo: `git clone git@github.com:octanner/cli-core-auth-plugin.git`.

Add a symbolic link to the development folder you created: 

```zsh
ln -s ~/.akkeris/plugins/coreauth {location of repo folder}
```

**Note: `ak update` will fail when trying to update this plugin, that's expected.**

### Testing

You must run 

```zsh
npm run build
```

when wanting to test new code, it runs `index.js` which is symbolicly linked to `/dist/index.js` -> compiled from `ncc`.

### Committing & Deploying

Build the code to compile it & and commit it

```zsh
npm run build
```

Then run:

```zsh
npm version {major|minor|patch}
```
