import { getAccount } from "@/features/account/services";
import { Account, AccountStatus } from "@/features/account/types";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/features/auth/constants/credentials";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextProps = {
  account: Account | null;
  setStatus: (status: AccountStatus) => void;
  authenticated: boolean;
  authenticate: (accessToken: string, refreshToken: string) => void;
  revoke: () => void;
  refetch: () => void;
  initialized: boolean;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  const [account, setAccount] = useState<Account | null>(null);

  const authenticated = useMemo(() => !!account, [account]);

  const revoke = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setAccount(null);
    setInitialized(true);
  }, []);

  const refetch = useCallback(
    () =>
      getAccount()
        .then(setAccount)
        .catch(revoke)
        .finally(() => setInitialized(true)),
    [revoke],
  );

  const authenticate = useCallback(
    (accessToken: string, refreshToken: string) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      refetch();
    },
    [refetch],
  );

  const setStatus = useCallback((status: AccountStatus) => {
    setAccount((prev) => {
      if (prev) {
        return { ...prev, status };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (accessToken) {
      authenticate(accessToken, refreshToken || "");
      return;
    }

    revoke();
  }, []);

  const value = useMemo(
    () => ({
      account,
      setStatus,
      authenticated,
      authenticate,
      revoke,
      refetch,
      initialized,
    }),
    [
      account,
      setStatus,
      authenticated,
      authenticate,
      revoke,
      refetch,
      initialized,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { AuthContext, AuthProvider, useAuth };
