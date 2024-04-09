import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import {
  AppConfigProvider,
  useAppConfig,
} from "@/features/common/contexts/AppConfigContext";
import { LoadingProvider } from "@/features/companies/hooks/LoadingCompany";
import router from "@/router";
import theme from "@/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const ChakraWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { colors } = useAppConfig();

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider
        theme={{
          ...theme,
          colors: {
            ...theme.colors,
            primary: { ...theme.colors.primary, ...(colors.primary || {}) },
            gray: { ...theme.colors.gray, ...(colors.gray || {}) },
          },
        }}
        resetCSS
      >
        {children}
      </ChakraProvider>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>

      <AppConfigProvider>
        <AuthProvider>
          <ChakraWrapper>
            <RouterProvider router={router} />
          </ChakraWrapper>
        </AuthProvider>
      </AppConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      </LoadingProvider>

    </QueryClientProvider>
  );
}

export default App;
