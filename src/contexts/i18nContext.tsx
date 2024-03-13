import { NextIntlClientProvider, useMessages } from "next-intl";

const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export { I18nProvider };

