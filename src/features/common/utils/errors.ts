import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";

type ErrorBag = {
  message: string;
  fields: Record<string, string>;
};

const MessageMap: Record<number, string> = {
  400: "Erro ao processar sua solicitação",
  401: "Você não tem permissão para acessar este recurso",
  404: "Recurso não encontrado",
  500: "Erro interno do servidor",
};

export const getErrorBag = (error: Error): ErrorBag => {
  if (!(error instanceof AxiosError)) {
    return {
      message: MessageMap[400],
      fields: {},
    };
  }

  const { response } = error;

  const bag: ErrorBag = {
    message: MessageMap[response?.status || 400] || MessageMap[400],
    fields: {},
  };

  if (!response || response.status === 500) {
    return bag;
  }

  const { data } = response;

  if (typeof data === "string") {
    bag.message = data;
  }

  if (typeof data === "object") {
    const { message, detail, errors } = data as {
      message: string;
      detail: string;
      [key: string]: string | string[];
    };

    bag.message = message || detail || bag.message;

    Object.entries(errors || {}).forEach(([key, value]) => {
      bag.fields[key] = Array.isArray(value) ? value[0] || "" : value;
    });
  }

  return bag;
};

export const setFormErrors = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  error: Error
): ErrorBag => {
  const bag = getErrorBag(error);

  Object.entries(bag.fields).forEach(([key, value]) => {
    form.setError(key, {
      type: "manual",
      message: value,
    });
  });

  return bag;
};
