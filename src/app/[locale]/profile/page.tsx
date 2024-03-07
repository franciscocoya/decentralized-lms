"use client"

import { checkIsValidToken } from "@/service/authService";
import React, { useEffect } from "react";

const UserProfilePage: React.FC = () => {
  useEffect(() => {
    checkIsValidToken(sessionStorage.getItem("accessToken") ?? "").then(
      (res) => {
        console.log("isValid: ", res);
      }
    );
  }, []);

  return (
    <div>
      <h1>User profile page</h1>
    </div>
  );
};

export default UserProfilePage;
