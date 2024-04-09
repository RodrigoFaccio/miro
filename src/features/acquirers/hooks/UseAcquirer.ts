import { getAcquirer } from "@/features/acquirers/services";
import { Acquirer } from "@/features/acquirers/types";
import { useQuery } from "@tanstack/react-query";

const useAcquirer = (id?: number) =>
  useQuery<Acquirer>({
    queryKey: ["acquirer.fees", { id }],
    queryFn: () => getAcquirer(id as number),
    enabled: !!id,
    initialData: undefined,
  });

export { useAcquirer };
