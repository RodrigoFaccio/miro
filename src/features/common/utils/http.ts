import { PeriodData } from "@/features/common/components/dates/PeriodInput";
import { PaginationRequest } from "@/features/common/types/pagination";
import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";

export const parseResponseError = (error: AxiosError): string => {
  const { status, data } = error.response as AxiosResponse;

  if (status === 400) {
    return data?.message || data?.detail || "Erro ao processar requisição";
  }

  if (status === 401) {
    return "Você não tem permissão para acessar este recurso";
  }

  if (status === 404) {
    return "Recurso não encontrado";
  }

  if (status === 500) {
    return "Erro interno do servidor";
  }

  return "Erro ao processar requisição";
};

export const parsePaginationParams = ({
  pageIndex,
  pageSize,
  search,
  filters,
  sorting,
  end_date,
  start_date,
  user

}: PaginationRequest) => {
  const ordering = sorting
    .map((sort) => (sort.desc ? `-${sort.id}` : sort.id))
    .pop();

  return {
    page: pageIndex + 1,
    page_size: pageSize,
    search,
    user,
    end_date,
    start_date,
    ...(ordering && { ordering }),
    ...filters.reduce((acc, filter) => {
      let value = filter.value;
      if (Array.isArray(filter.value)) {
        value = filter.value.join(",");
      }
      if (typeof filter.value === "object") {
        const { startDate, endDate } = (filter.value || {}) as PeriodData;
        if (startDate && endDate) {
          value = [startDate, endDate]
            .map((date) => (date ? moment(date).format("YYYY-MM-DD") : null))
            .join(",");
        }
      }
      return {
        ...acc,
        [filter.id]: value,
      };
    }, {}),
  };
};
