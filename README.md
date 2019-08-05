# Core | cli-core-auth-plugin

Use this Akkeris CLI plugin to create a Core Auth OAuth Client and add it's credentials to your Akkeris App by using this plugin.

> Creates a new Core-Auth OAuth Client and adds the following as config VARs to your app:
>
> ```json
> {
>   "CORE_AUTH_CLIENT_ID": "clientId",
>   "CORE_AUTH_CLIENT_SECRET": "clientSecret",
>   "CORE_AUTH_POST_LOGIN_URLS": "[\"redirectUris\"]",
>   "CORE_AUTH_POST_LOGOUT_URLS": "[\"returntoUris\"]"
> }
> ```

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

## Developing

To edit the group, name, or other details, edit `plugin.js`.

To edit the existing commands or add to them, edit the respective command in `/commands`.

Run `npm run build` and commit changes before running `npm version`.

## Usage

### Web Client

```zsh
# Local
ak core:auth:client:create \
-a ccap \
-s core-dev \
-r http://localhost:3000/auth/callback \
-r https://app-stg.octanner.io/auth/callback \
-l http://localhost:3000/auth/login \
-l https://app-stg.octanner.io/auth/login \
-e local \
-t WEB

# Stage
ak core:auth:credentials:create -a app -s space-stg -e stg -r http://localhost:3000/auth/callback -r https://app-stg.octanner.io/auth/callback -l http://localhost:3000/auth/login -l https://app-stg.octanner.io/auth/login

# Production
ak core:auth:credentials:create -a app -s space-prd -e prd -r https://app.octanner.io/auth/callback -l https://app.octanner.io/auth/login
```

### API Service

```zsh
# Stage
ak core:auth:credentials:create \
-a app \
-s space-stg \
-e stg

# Production
ak core:auth:credentials:create -a app -s space-prd -e prd
```

### Mobile App

```zsh
# Stage
ak core:auth:credentials:create \
-a app \
-s space-stg \
-e stg \
-r oct-auth://mobile-app/callback \
-l oct-auth://mobile-app/logout

# Production
ak core:auth:credentials:create -a app -s space-prd -e prd -r oct-auth://mobile-app/callback -l oct-auth://mobile-app/logout
```

## Options

```zsh
$ ak core:auth:credentials:create --help
ak core:auth:credentials:create

Manage your app\'s Core-Auth OAuth Client Credentials

Options:
  --version               Show version number                                                                                                         [boolean]
  --help                  Show help                                                                                                                   [boolean]
  --app, -a               An existing app that needs core auth credentials                                                                            [string] [required]
  --space, -s             Space to which the app belongs to. Production requires "https" URLs                                                         [string] [required]
  --post_login_url, -r    URL that your app will be listening on for an "authorization_code" once a user authenticates. Can be passed multiple times  [string]
  --post_logout_url, -l   URL that the client can redirect a user to upon logging out of sessions. Can be passed multiple times                       [string]
  --type, -t              [WEB|MOBILE|API] which describes the Type of OAUTH Client your app needs                                                    [string]
  --environment, -e       [qa|stg|prd] describes which Core Auth environment the credentials will be created                                          [string]
```

## FUTURE TODOS

- [x] `ak core:auth:client:create`
- [ ] `ak core:auth:client:update`
- [ ] `ak core:auth:client:remove`
- [ ] `ak core:auth:client:regeneratesecret`
