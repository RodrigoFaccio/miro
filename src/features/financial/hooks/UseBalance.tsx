import { getBalance } from "@/features/financial/services";
import { useQuery } from "@tanstack/react-query";

const useBalance = () =>
  useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
    initialData: {
      balance: 0,
    },
  });

export default useBalance;
