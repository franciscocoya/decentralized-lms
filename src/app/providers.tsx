"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";

import { I18nProvider } from "@/contexts/i18nContext";
import { UserDataProvider } from "@/contexts/userDataContext";
import { ReactNode } from "react";
import { AnimateSharedLayout } from "framer-motion";

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <I18nProvider>
      <UserDataProvider>
        <AnimateSharedLayout>
          <Header />
          {children}
          <Footer />
        </AnimateSharedLayout>
      </UserDataProvider>
    </I18nProvider>
  );
};

export default AllProviders;
