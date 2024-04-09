import AccountStatusModal from "@/features/account/modals/AccountStatusModal";
import { AccountStatus } from "@/features/account/types";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import OnBoardFirstStepModal from "@/features/onboard/components/OnBoardFirstStepModal";
import {
  OnBoardSteps,
  useOnBoard,
} from "@/features/onboard/contexts/OnBoardContext";
import { Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

const OnBoardGuard: React.FC = () => {
  const navigate = useNavigate();

  const { activeStep, setActiveStep } = useOnBoard();

  const { account } = useAuth();

  const status = account?.status ?? AccountStatus.ACTIVE;

  const showFirstStepModal =
    activeStep === OnBoardSteps.FirstStep && status === AccountStatus.PENDING;

  const showStatusModal = [
    AccountStatus.BLOCKED,
    AccountStatus.CANCELED,
    AccountStatus.DENIED,
    AccountStatus.FAILED,
    AccountStatus.SUSPENDED,
  ].includes(status);

  return (
    <Box
      sx={{
        ...(showFirstStepModal && {
          "& > *": {
            pointerEvents: "none",
          },
        }),
      }}
    >
      <AccountStatusModal status={status} open={showStatusModal} />

      <OnBoardFirstStepModal
        open={showFirstStepModal}
        onClose={() => {
          setActiveStep(OnBoardSteps.FirstStep + 1);
          navigate("/banking");
        }}
      />

      <Outlet />
    </Box>
  );
};

export default OnBoardGuard;
