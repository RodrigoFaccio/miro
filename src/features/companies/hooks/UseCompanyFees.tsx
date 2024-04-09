import { getCompanyFees } from "@/features/companies/services";
import { CompanyFeeData, CompanyFeesScope } from "@/features/companies/types";
import { useQuery } from "@tanstack/react-query";

const useCompanyFees = (scope: CompanyFeesScope, id?: number) =>
  useQuery<CompanyFeeData>({
    queryKey: ["company.fees", { scope, id }],
    queryFn: () =>
      getCompanyFees(scope === CompanyFeesScope.GLOBAL ? undefined : id),
    enabled: !!id || scope === CompanyFeesScope.GLOBAL,
    initialData: undefined,
  });

export { useCompanyFees };
