# Core | cli-core-auth-plugin

Add a Core Auth OAuth Client Access to your Akkeris App by using this plugin.

Creates a new Core-Auth OAuth Client and adds the following as config VARs to your app:

```json
{
  "CORE_AUTH_CLIENT_ID": "client_id",
  "CORE_AUTH_CLIENT_SECRET": "client_secret",
  "CORE_AUTH_REDIRECT_URIS": "redirect_uris",
  "CORE_AUTH_RETURNTO_URIS": "returnto_uris"
}
```

## Github

[cli-core-auth-plugin | Github](https://github.com/octanner/cli-core-auth-plugin)

## Install

Use HTTPS:

```zsh
aka plugins:install https://github.com/octanner/cli-core-auth-plugin
```

or via SSH:

```zsh
aka plugins:install git@github.com:octanner/cli-core-auth-plugin.git
```

## Usage

### Web Client

```zsh
# Stage
ak core:auth:credentials:create -a app -s space-stg -e stg -r http://localhost:3000/auth/callback -r https://app-stg.octanner.io/auth/callback -l http://localhost:3000/auth/login -l https://app-stg.octanner.io/auth/login

# Production
ak core:auth:credentials:create -a app -s space-prd -e prd -r https://app.octanner.io/auth/callback -l https://app.octanner.io/auth/login
```

### API Service

```zsh
# Stage
ak core:auth:credentials:create -a app -s space-stg -e stg

# Production
ak core:auth:credentials:create -a app -s space-prd -e prd
```

### Mobile App

```zsh
# Stage
ak core:auth:credentials:create -a app -s space-stg -e stg -r oct-auth://mobile-app/callback -l oct-auth://mobile-app/logout

# Production
ak core:auth:credentials:create -a app -s space-prd -e prd -r oct-auth://mobile-app/callback -l oct-auth://mobile-app/logout
```

## Options

```zsh
$ ak core:auth:credentials:create --help
ak core:auth:credentials:create

Manage your app\'s Core-Auth OAuth Client Credentials

Options:
  --version             Show version number                                                                            [boolean]
  --help                Show help                                                                                      [boolean]
  --app, -a             An existing app that needs core auth credentials                                               [string] [required]
  --space, -s           Space to which the app belongs to                                                              [string]
  --redirect_uris, -r   Redirect URIs, URLs that the user will be redirected to upon authenticating                    [string]
  --returnto_uris, -l   Post logout redirect URIs, URLs that the client can redirect a user to after logging out       [string]
  --type, -t            [WEB|MOBILE|API] which describes the Type of OAUTH Client your app needs                       [string]
  --environment, -e     [qa|stg|prd] describes which Core Auth environment the credentials will be created             [string]
```

## FUTURE TODOS

- [x] `ak core:auth:client:create`
- [ ] `ak core:auth:client:update`
- [ ] `ak core:auth:client:remove`
- [ ] `ak core:auth:client:regeneratesecret`
