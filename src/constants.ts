const SERVER_URL = "http://localhost:3000";
const ACCOUNT_BASE_URL = `${SERVER_URL}/.account`;
const SIGNUP_URL = `${ACCOUNT_BASE_URL}/account/`;
const FORGOT_PASSWORD_URL = `${SERVER_URL}/login/password/forgot/`;
const RESET_PASSWORD_URL = `${SERVER_URL}/login/password/reset/`;
const PROFILE_URL_SUFFIX = `profile/card#me`; // i.e. http://localhost:3000/pod-example-1/profile/card#mes
const TOKEN_URL_SUFFIX = '/.oidc/token';

const CSS_AUTHORITY_TOKEN_HEADER_SUFFIX = "CSS-Account-Token";

// Session storage keys
const ACCESS_TOKEN = "accessToken"
const DPOP_KEY = "dpopKey"
const PROFILE_POD_NAME = "ppn"

export {
    SERVER_URL,
    ACCOUNT_BASE_URL,
    SIGNUP_URL,
    FORGOT_PASSWORD_URL,
    RESET_PASSWORD_URL,
    PROFILE_URL_SUFFIX,
    TOKEN_URL_SUFFIX,

    CSS_AUTHORITY_TOKEN_HEADER_SUFFIX,

    ACCESS_TOKEN,
    DPOP_KEY,
    PROFILE_POD_NAME
}