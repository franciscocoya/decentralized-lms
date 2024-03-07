type RootLayoutProps = {
  children: React.ReactNode;
};

//i18n
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: "es-ES" | "en-UK";
  }
}

// react-hook-form
type Inputs = {
  email: string;
  password: string;
};

type CustomFormMessageProps = {
  msg: string;
  type?: "error" | "warning" | "info" | "success";
  closeable?: boolean;
};

// Auth Service
interface AuthTokenData {
  id: string,
  secret: string,
}

export type { Inputs, AuthTokenData, CustomFormMessageProps, LocaleLayoutProps, RootLayoutProps };
