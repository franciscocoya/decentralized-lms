import { Inter } from "next/font/google";
import "../globals.css";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { LocaleLayoutProps } from "@/types";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: React.FC<LocaleLayoutProps> = ({
  children,
  params: { locale },
}) => {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className} style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        margin: 0,
        padding: 0,

      }}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
