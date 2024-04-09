import { getAcquirers } from "@/features/acquirers/services";
import { useQuery } from "@tanstack/react-query";

const useAcquirers = () =>
  useQuery({
    queryKey: ["acquirers"],
    queryFn: getAcquirers,
    select: (data) => ({
      results: data.results.sort((a, b) => a.id - b.id),
      count: data.count,
    }),
    initialData: {
      results: [],
      count: 0,
    },
  });

export default useAcquirers;
