import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

type QueryEventsProps = {
  query: UseQueryResult;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

const useQueryEvents = ({ query, onSuccess, onError }: QueryEventsProps) => {
  const { isError, isSuccess, error } = query;

  useEffect(() => {
    if (isError) {
      onError?.(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return null;
};

export { useQueryEvents };
