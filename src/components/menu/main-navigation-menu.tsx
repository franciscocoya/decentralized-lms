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

import { useLocale, useTranslations } from "next-intl";

const MainNavigationMenu = () => {
  const t = useTranslations("components.header.menu"); // translations

  const { locale } = useLocale();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Home */}
        <Link href={`/${locale}`} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {t("home")}
          </NavigationMenuLink>
        </Link>

        {/* Saved courses */}
        <Link href={`/${locale}/saved`} legacyBehavior passHref>
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
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigationMenu;
