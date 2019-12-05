const app = {
  alias: 'a',
  string: true,
  demand: true,
  description: 'An existing app that needs client credentials'
}

const space = {
  alias: 's',
  string: true,
  demand: false,
  description:
      "The space which the app belongs to (Production does not allow unsecure 'http' URLs)"
}

const postLoginURL = {
  alias: 'r',
  string: true,
  demand: false,
  description:
      'URL that your app will be listening on for an "authorization_code" once a user authenticates (Can be passed multiple times)'
}

const postLogoutURL = {
  alias: 'l',
  string: true,
  demand: false,
  description:
      'URL that the client can redirect a user to upon logging out of sessions (Can be passed multiple times)'
}

const type = {
  alias: 't',
  string: true,
  demand: true,
  description:
      '[WEB|MOBILE|API] which describes the Type of OAuth Client your app needs'
}

const environment = {
  alias: 'e',
  string: true,
  demand: true,
  description:
      '[STG|PRD] describes which Core Auth environment the credentials will be created'
}

module.exports = {
  app,
  space,
  post_login_url: postLoginURL,
  postLoginURL,
  post_logout_url: postLogoutURL,
  postLogoutURL,
  type,
  environment
}
