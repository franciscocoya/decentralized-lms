import { UserSessionAuthData } from "@/types";
import React, { createContext, useEffect, useState } from "react";

import { checkIsValidToken } from "@/service/authService";

const UserDataContext = createContext<UserSessionAuthData>({
    isLogged: false,
});

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      checkIsValidToken(accessToken).then((response) => {
        setIsLogged(response);
      });
    }
  }, [isLogged]);

  return (
    <UserDataContext.Provider value={{ isLogged }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };
