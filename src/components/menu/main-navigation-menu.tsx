"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import { getLocaleFromPath } from "@/lib/string";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { UserDataContext } from "@/contexts/userDataContext";

import { usePathname } from "next/navigation";

const NotLoggedInNavigationMenu = () => {
  const t = useTranslations("components.header.menu"); // translations

  const currentPath = usePathname();
  const currentLocale = getLocaleFromPath(currentPath) ?? "es";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Login */}
        <Link href={`/${currentLocale}/login`} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {t("login")}
          </NavigationMenuLink>
        </Link>

        {/* Register */}
        <Link href={`/${currentLocale}/signup`} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {t("register")}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const LoggedInNavigationMenu = () => {
  const t = useTranslations("components.header.menu");

  const currentPath = usePathname();
  const currentLocale = getLocaleFromPath(currentPath) ?? "es";

  return (
    <>
      {/* Saved courses */}
      <Link href={`/${currentLocale}/saved`} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {t("saved")}
        </NavigationMenuLink>
      </Link>

      {/* My courses */}
      <NavigationMenuItem>
        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  <div className="mb-2 mt-4 text-lg font-medium">
                    <h2>Courses</h2>
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Beautifully designed components that you can copy and paste
                    into your apps. Accessible. Customizable. Open Source.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>

            <ul>
              <li>asdlkfasdf</li>
              <li>asdlkfasdf</li>
              <li>asdlkfasdf</li>
            </ul>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {/* My profile */}
      <NavigationMenuItem>
        <NavigationMenuTrigger>{t("profile.title")}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>{t("profile.title")}</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </>
  );
};

const MainNavigationMenu = () => {
  const { isLogged } = useContext(UserDataContext);
  const t = useTranslations("components.header.menu");

  const currentPath = usePathname();
  const currentLocale = getLocaleFromPath(currentPath);

  useEffect(() => {
  }, [isLogged]);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {currentPath !== `/${currentLocale}` && (
          <Link href={`/${currentLocale ?? "es"}`} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("home")}
            </NavigationMenuLink>
          </Link>
        )}

        {isLogged ? <LoggedInNavigationMenu /> : <NotLoggedInNavigationMenu />}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigationMenu;
