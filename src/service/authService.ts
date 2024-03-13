import { AuthTokenData } from "@/types";
import {
  buildAuthenticatedFetch,
  createDpopHeader,
  generateDpopKeyPair,
  isSupportedTokenType,
} from "@inrupt/solid-client-authn-core";
import axios from "axios";

import {
  ACCESS_TOKEN,
  ACCOUNT_BASE_URL,
  CSS_AUTHORITY_TOKEN_HEADER_SUFFIX,
  DPOP_KEY,
  SERVER_URL,
  SIGNUP_URL,
  TOKEN_URL_SUFFIX,
} from "@/constants";

const login = async (email: string, password: string): Promise<any> => {
  try {
    const indexResponse = await fetch(`${ACCOUNT_BASE_URL}/`);
    const { controls } = await indexResponse.json();

    const response = await fetch(controls.password.login, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      return Promise.reject(new Error("Bad credentials!"));
    }

    const { authorization } = await response.json();

    if (authorization) {
      const data = await autorizeAndLogin(authorization);

      if (data) {
        await generateToken(data).then(() => {
          // redirect to /profile
          if (
            sessionStorage.getItem(ACCESS_TOKEN) &&
            sessionStorage.getItem(DPOP_KEY)
          ) {
            window.location.href = "/es/profile";
            return Promise.resolve();
          } else {
            return Promise.reject(new Error("Bad credentials!"));
          }
        });
      }
    }
  } catch (error) {
    // !TODO: Handle login error
    return Promise.reject(error);
  }
};

const generateToken = async (data: AuthTokenData): Promise<void> => {
  try {
    const dpopKey = await generateDpopKeyPair();

    const authString = `${encodeURIComponent(data.id)}:${encodeURIComponent(
      data.secret
    )}`;
    const tokenUrl = `${SERVER_URL}${TOKEN_URL_SUFFIX}`;

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        // The header needs to be in base64 encoding.
        authorization: `Basic ${Buffer.from(authString).toString("base64")}`,
        "content-type": "application/x-www-form-urlencoded",
        dpop: await createDpopHeader(tokenUrl, "POST", dpopKey),
      },
      body: "grant_type=client_credentials&scope=webid",
    });

    const { access_token: accessToken } = await response.json();

    if (accessToken) {
      sessionStorage.setItem(ACCESS_TOKEN, accessToken);
      sessionStorage.setItem(DPOP_KEY, JSON.stringify(dpopKey));

      return Promise.resolve();
    }
  } catch (error) {
    console.error("There was an error generating the token:\n" + error);
    return Promise.reject(error);
  }
};

/**
 * Private function to authorize and login into SOLID pod.
 * @param authorization - The authorization token received from the server.
 * @returns Promise<AuthTokenData | undefined>
 */
const autorizeAndLogin = async (
  authorization: string
): Promise<AuthTokenData | undefined> => {
  try {
    const indexResponse = await fetch(`${ACCOUNT_BASE_URL}/`, {
      method: "GET",
      headers: {
        authorization: `${CSS_AUTHORITY_TOKEN_HEADER_SUFFIX} ${authorization}`,
      },
    });

    const { controls } = await indexResponse.json();

    const response = await fetch(controls.account.clientCredentials, {
      method: "POST",
      headers: {
        authorization: `${CSS_AUTHORITY_TOKEN_HEADER_SUFFIX} ${authorization}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "my-token",
        webId: `${SERVER_URL}/personal/profile/card#me`,
      }),
    });

    const { id, secret } = await response.json();

    return { id, secret };
  } catch (error) {
    console.error("ERROR! " + error);
    return undefined;
  }
};

const logout = async (): Promise<void> => {
  try {
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(DPOP_KEY);
    // const response = await axios.post(`${BASE_URL}/logout`)
  } catch (error) {
    console.error(error);
  }
};

const register = async (email: string, password: string): Promise<void> => {
  try {
    // TODO: Check if user already exists
    const response = await axios.post(`${SIGNUP_URL}/`, {
      data: { email, password },
    });

    // // create a turtle query to register a new user
    // const query = `
    //   @prefix : <#>.
    //   @prefix solid: <http://www.w3.org/ns/solid/terms#>.
    //   @prefix foaf: <http://xmlns.com/foaf/0.1/>.

    //   :me solid:account [
    //     a solid:Account;
    //     solid:accountServiceHomepage <${ACCOUNT_BASE_URL}/>;
    //     solid:accountName "${email}";
    //     solid:password "${password}";
    //     solid:email "${email}";
    //   ].
    // `;

    // // create a new user
    // const newUser = await fetch(`${ACCOUNT_BASE_URL}/profile/card`, {
    //   method: "PATCH",
    //   headers: {
    //     "content-type": "application/sparql-update",
    //     "if-match": "*",
    //   },
    //   body: query,
    // });

    console.log(response.data);
  } catch (error) {
    console.error("Error registering user: " + error);
  }
};

const myFetch = async (accessToken: string) => {
  try {
    if (
      sessionStorage.getItem(DPOP_KEY) !== null &&
      sessionStorage.getItem(ACCESS_TOKEN) !== null
    ) {
      const dpopKey = JSON.parse(sessionStorage.getItem(DPOP_KEY) ?? "");
      return await buildAuthenticatedFetch(accessToken, { dpopKey });
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Check if SOLID auth session token is valid and exists.
 * @param accessToken Token to check.
 * @returns Promise<boolean> - True if token is valid, false otherwise.
 */
const checkIsValidToken = async (accessToken: string): Promise<boolean> => {
  try {
    await isSupportedTokenType(accessToken);
    return true;
  } catch (error) {
    console.error("Error checking token type: " + error);
    return false;
  }
};

export { checkIsValidToken, login, logout, myFetch, register };
