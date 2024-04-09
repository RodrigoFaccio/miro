import { AxiosError } from "axios";
import { Path, UseFormReturn } from "react-hook-form";

export const applyFieldErrors = <T extends Record<string, unknown>>(
  error: AxiosError<unknown>,
  form: UseFormReturn<T>
) => {
  const data =
    error.response?.data || ({} as unknown as Record<string, unknown>);

  Object.entries(data).forEach(([key, value]) => {
    const [error] = Array.isArray(value) ? value : [value];

    if (error) {
      form.setError(key as Path<T>, {
        type: "manual",
        message: error as string,
      });
    }
  });
};
