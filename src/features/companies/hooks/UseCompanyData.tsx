import { getCompany } from "@/features/companies/services";
import { useQuery } from "@tanstack/react-query";

const useCompanyData = (id?: number) =>
  useQuery({
    queryKey: ["company", { id }],
    queryFn: () => getCompany(id as number),
    enabled: !!id,
    initialData: undefined,
  });

export { useCompanyData };
