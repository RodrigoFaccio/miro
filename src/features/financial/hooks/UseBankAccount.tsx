import { getBankAccount } from "@/features/financial/services";
import { useQuery } from "@tanstack/react-query";

const useBankAccount = () =>
  useQuery({
    queryKey: ["bank-account"],
    queryFn: getBankAccount,
    initialData: {
      bankNumber: "",
      accountNumber: "",
      accountDigit: "",
      agencyNumber: "",
      agencyDigit: "",
    },
  });

export default useBankAccount;
