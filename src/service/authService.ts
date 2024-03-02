import { AuthTokenData } from "@/types";
import {
  buildAuthenticatedFetch,
  createDpopHeader,
  generateDpopKeyPair,
} from "@inrupt/solid-client-authn-core";
import axios from "axios";

import { ACCOUNT_BASE_URL, SERVER_URL } from "@/constants";

const login = async (email: string, password: string): Promise<any> => {
  try {
    const indexResponse = await fetch(`${ACCOUNT_BASE_URL}/`);
    const { controls } = await indexResponse.json();

    const response = await fetch(controls.password.login, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if(response.status !== 200){
      return Promise.reject(new Error("Bad credentials!"));
    }

    const { authorization } = await response.json();

    if (authorization) {
      const data = await autorizeAndLogin(authorization);

      if (data) {
        await generateToken(data);
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
    const tokenUrl = `${SERVER_URL}/.oidc/token`;

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
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("dpopKey", JSON.stringify(dpopKey));
    }
  } catch (error) {
    console.error("There was an error generating the token:\n" + error);
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
      headers: { authorization: `CSS-Account-Token ${authorization}` },
    });

    const { controls } = await indexResponse.json();

    const response = await fetch(controls.account.clientCredentials, {
      method: "POST",
      headers: {
        authorization: `CSS-Account-Token ${authorization}`,
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
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("dpopKey");
    // const response = await axios.post(`${BASE_URL}/logout`)
  } catch (error) {
    console.error(error);
  }
};

const register = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post(`${ACCOUNT_BASE_URL}/`, {
      data: { email, password },
    });
    // Handle successful registration
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const myFetch = async (accessToken: string) => {
  try {
    if (
      sessionStorage.getItem("dpopKey") !== null &&
      sessionStorage.getItem("accessToken") !== null
    ) {
      const dpopKey = JSON.parse(sessionStorage.getItem("dpopKey") ?? "");
      return await buildAuthenticatedFetch(accessToken, { dpopKey });
    }
  } catch (error) {
    console.error(error);
  }
};

export { login, logout, myFetch, register };
