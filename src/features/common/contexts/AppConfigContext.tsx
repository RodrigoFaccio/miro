import theme from "@/theme";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Helmet } from "react-helmet";

type ThemeColor = Partial<{
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}>;

type AppConfigContextType = {
  favicon: string;
  logo: string;
  title: string;
  backgroundImage: string | undefined | null;
  colors: {
    primary: ThemeColor;
    gray: ThemeColor;
  };
};

const CONFIG_KEY = "@cakto/config";

const faviconUrl = import.meta.env.VITE_FAVICON_URL || undefined;

const logoUrl = import.meta.env.VITE_LOGO_URL || undefined;

const appConfigUrl = import.meta.env.VITE_APP_CONFIG_URL || undefined;

const DefaultAppConfig: AppConfigContextType = {
  title: "Split Seller",
  logo: "/vite.svg",
  favicon: "/vite.svg",
  backgroundImage: undefined,
  colors: {
    primary: theme.colors.primary,
    gray: theme.colors.gray,
  },
};

const AppConfigContext = createContext<AppConfigContextType>(
  DefaultAppConfig as AppConfigContextType
);

const AppConfigProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const getInitialData = (): AppConfigContextType => {
    if (!appConfigUrl) {
      return DefaultAppConfig;
    }
    const data = localStorage.getItem(CONFIG_KEY);
    try {
      return data ? JSON.parse(data) : DefaultAppConfig;
    } catch (error) {
      return DefaultAppConfig;
    }
  };

  const {
    data: { title, colors },
  } = useQuery<{
    title: string;
    colors: AppConfigContextType["colors"];
  }>({
    queryKey: ["app-config"],
    queryFn: () => axios.get(appConfigUrl).then((response) => response.data),
    initialData: getInitialData(),
    enabled: !!appConfigUrl,
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  const value = useMemo(
    () => ({
      title: title || DefaultAppConfig.title,
      colors: colors || DefaultAppConfig.colors,
      logo: logoUrl || DefaultAppConfig.logo,
      favicon: faviconUrl || DefaultAppConfig.favicon,
      backgroundImage: DefaultAppConfig.backgroundImage,
    }),
    [title, colors]
  );

  useEffect(() => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(value));
  }, [value]);

  return (
    <>
      <Helmet>
        <link rel="icon" href={faviconUrl} />
        <title>{title}</title>
      </Helmet>
      <AppConfigContext.Provider value={value}>
        {children}
      </AppConfigContext.Provider>
    </>
  );
};

const useAppConfig = () => {
  const context = useContext(AppConfigContext);

  if (!context) {
    throw new Error("useAppConfig must be used within an AppConfigProvider");
  }

  return context;
};

export { AppConfigContext, AppConfigProvider, useAppConfig };
