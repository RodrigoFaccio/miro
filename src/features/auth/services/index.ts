import { NewPasswordFormValues } from "@/features/auth/schemas/NewPasswordFormSchema";
import { RecoverPasswordFormValues } from "@/features/auth/schemas/RecoverPasswordFormSchema";
import { RegisterFormValues } from "@/features/auth/schemas/RegisterFormSchema";
import {
  LoginUserInput,
  LoginUserPayload,
  RegisterUserPayload,
} from "@/features/auth/types";
import { GuestHttp } from "@/features/common/http/axios";

export const login = (credentials: LoginUserInput): Promise<LoginUserPayload> =>
  GuestHttp.post<LoginUserPayload>("/token/", credentials).then(
    (response) => response.data
  );

export const register = (
  data: RegisterFormValues
): Promise<RegisterUserPayload> =>
  GuestHttp.post<RegisterUserPayload>("/seller/create/", data).then(
    (response) => response.data
  );

export const refreshToken = ({
  token,
}: {
  token: string;
}): Promise<LoginUserPayload> =>
  GuestHttp.post<LoginUserPayload>("/token/refresh/", {
    refresh: token,
  }).then((response) => response.data);

export const sendRecoveryEmail = (
  payload: RecoverPasswordFormValues
): Promise<void> =>
  // GuestHttp.post("/recovery/send-email/", payload).then((response) => response.data);
  new Promise((resolve) => {
    console.log("recoverPassword", payload);
    setTimeout(() => resolve(), 1000);
  });

export const newPassword = (payload: NewPasswordFormValues): Promise<void> =>
  // GuestHttp.post("/recovery/change-password/", payload).then((response) => response.data);
  new Promise((resolve) => {
    console.log("newPassword", payload);
    setTimeout(() => resolve(), 1000);
  });
