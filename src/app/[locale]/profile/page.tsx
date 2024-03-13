"use client";

import PageTransition from "@/components/transitions/pageTransition";
import { PROFILE_POD_NAME } from "@/constants";
import { getProfileData } from "@/service/podService";
import React, { useEffect } from "react";

const UserProfilePage: React.FC = () => {
  const loadData = async () => {
    await getProfileData(
      sessionStorage.getItem(PROFILE_POD_NAME) ?? "pod-example-1"
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageTransition>
      <h1>User profile page</h1>
    </PageTransition>
  );
};

export default UserProfilePage;
