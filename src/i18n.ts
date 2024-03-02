import { IntlErrorCode } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
const locales = ["en", "es"];

export default getRequestConfig(async ({ locale }) => {
  const baseLocale = new Intl.Locale(locale).baseName;

  if (!locales.includes(baseLocale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
