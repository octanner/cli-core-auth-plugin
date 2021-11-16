'use strict'

module.exports = {
  local: {
    CORE_CLIENT_ID: null,
    CORE_CLIENT_SECRET: null,
    CORE_CLIENT_LOGIN_REDIRECT_URI: null,
    CORE_CLIENT_LOGOUT_REDIRECT_URI: null,
    CORE_CLIENT_SCOPE: null,
    CORE_CLIENT_TYPE: null,
    CORE_AUTHORIZATION_URL: 'http://localhost:5001/sso/oauth/authorize',
    CORE_TOKEN_URL: 'http://localhost:5001/sso/oauth/token',
    CORE_INTROSPECTION_URL: 'http://localhost:5001/sso/oauth/introspection',
    CORE_REVOCATION_URL: 'http://localhost:5001/sso/oauth/revoke',
    CORE_JWKS_URL: 'http://localhost:5001/.well-known/jwks.json'
    // 'CORE_CLIENT_METADATA_URL': 'http://localhost:5001/sso/oauth/.well-known/metadata'
  },
  qa: {
    CORE_CLIENT_ID: null,
    CORE_CLIENT_SECRET: null,
    CORE_CLIENT_LOGIN_REDIRECT_URI: null,
    CORE_CLIENT_LOGOUT_REDIRECT_URI: null,
    CORE_CLIENT_SCOPE: null,
    CORE_CLIENT_TYPE: null,
    CORE_AUTHORIZATION_URL: 'http://sso.core-qa/sso/oauth/authorize',
    CORE_TOKEN_URL: 'http://sso.core-qa/sso/oauth/token',
    CORE_INTROSPECTION_URL: 'http://sso.core-qa/sso/oauth/introspection',
    CORE_REVOCATION_URL: 'http://sso.core-qa/sso/oauth/revoke',
    CORE_JWKS_URL: 'http://sso.core-qa/.well-known/jwks.json'
    // 'CORE_CLIENT_METADATA_URL': 'http://sso.core-qa/sso/oauth/metadata'
  },
  stg: {
    CORE_CLIENT_ID: null,
    CORE_CLIENT_SECRET: null,
    CORE_CLIENT_LOGIN_REDIRECT_URI: null,
    CORE_CLIENT_LOGOUT_REDIRECT_URI: null,
    CORE_CLIENT_SCOPE: null,
    CORE_CLIENT_TYPE: null,
    CORE_AUTHORIZATION_URL: 'http://sso.core-stg/sso/oauth/authorize',
    CORE_TOKEN_URL: 'http://sso.core-stg/sso/oauth/token',
    CORE_INTROSPECTION_URL: 'http://sso.core-stg/sso/oauth/introspection',
    CORE_REVOCATION_URL: 'http://sso.core-stg/sso/oauth/revoke',
    CORE_JWKS_URL: 'http://sso.core-stg/.well-known/jwks.json'
    // 'CORE_CLIENT_METADATA_URL': 'http://sso.core-stg/sso/oauth/metadata'
  },
  prd: {
    CORE_CLIENT_ID: null,
    CORE_CLIENT_SECRET: null,
    CORE_CLIENT_LOGIN_REDIRECT_URI: null,
    CORE_CLIENT_LOGOUT_REDIRECT_URI: null,
    CORE_CLIENT_SCOPE: null,
    CORE_CLIENT_TYPE: null,
    CORE_AUTHORIZATION_URL: 'http://sso.core-prd/sso/oauth/authorize',
    CORE_TOKEN_URL: 'http://sso.core-prd/sso/oauth/token',
    CORE_INTROSPECTION_URL: 'http://sso.core-prd/sso/oauth/introspection',
    CORE_REVOCATION_URL: 'http://sso.core-prd/sso/oauth/revoke',
    CORE_JWKS_URL: 'http://sso.core-prd/.well-known/jwks.json'
    // 'CORE_CLIENT_METADATA_URL': 'http://sso.core-prd/sso/oauth/metadata'
  }
}
