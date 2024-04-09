import { AccountStatusConfig } from "@/features/account/constants";
import { AccountStatus } from "@/features/account/types";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useMemo } from "react";

const useAccountStatusConfig = () => {
  const { account } = useAuth();

  const status = useMemo(() => {
    if (!account || !Object.values(AccountStatus).includes(account.status)) {
      return AccountStatusConfig.failed;
    }
    return AccountStatusConfig[account.status];
  }, [account]);

  return {
    status,
  };
};

export default useAccountStatusConfig;
