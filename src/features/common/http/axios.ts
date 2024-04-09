import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/features/auth/constants/credentials";
import { refreshToken as refreshTokenService } from "@/features/auth/services";
import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";

type QueueItem = {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
  config: AxiosRequestConfig;
};

const RefreshState = {
  refreshing: false,
  queue: [] as QueueItem[],
};

const GuestHttp = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AuthenticatedHttp = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  RefreshState.refreshing = false;
  RefreshState.queue = [];
};

const refresh = async (): Promise<{ access: string }> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    return Promise.reject();
  }

  return refreshTokenService({ token: refreshToken }).then((response) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, response.access);
    return response;
  });
};

const getToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!token) {
    return null;
  }

  try {
    jwtDecode(token);
  } catch (e) {
    return null;
  }

  return token;
};

AuthenticatedHttp.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

AuthenticatedHttp.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (![401, 403].includes(error.response.status)) {
      return Promise.reject(error);
    }

    if (RefreshState.refreshing) {
      return new Promise((resolve, reject) => {
        RefreshState.queue.push({ resolve, reject, config: error.config });
      });
    }

    RefreshState.refreshing = true;

    try {
      const { access } = await refresh();

      error.config.headers.Authorization = `Bearer ${access}`;

      RefreshState.refreshing = false;

      RefreshState.queue.forEach(({ config, resolve, reject }) => {
        AuthenticatedHttp.request(config).then(resolve).catch(reject);
      });

      RefreshState.queue = [];

      return AuthenticatedHttp.request(error.config);
    } catch (e) {
      logout();
    }

    return Promise.reject(error);
  }
);

export { AuthenticatedHttp, GuestHttp };
