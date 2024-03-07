"use client";

import Logo from "@/components/logo";
import MainNavigationMenu from "./menu/main-navigation-menu";

const Header = () => {
  return (
    <header className="bg-background">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <Logo />
          <MainNavigationMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
