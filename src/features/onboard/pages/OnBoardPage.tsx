import { AccountFormValues } from "@/features/account/schemas/AccountFormSchema";
import { AccountStatus } from "@/features/account/types";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import PageContainer from "@/features/common/components/layout/PageContainer";
import { getErrorBag } from "@/features/common/utils/errors";
import OnBoardStepperForm from "@/features/onboard/components/OnBoardStepperForm";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

const OnBoardPage = () => {
  const toast = useToast();

  const { account, setStatus } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: AccountFormValues) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(values);
        }, 1000);
      }),
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Seus dados foram enviados com sucesso!",
      });
      setStatus(AccountStatus.WAITING_DOCUMENTS);
    },
    onError: (error) => {
      toast({
        title: "Erro!",
        description: getErrorBag(error).message,
        status: "error",
      });
    },
  });

  return (
    <PageContainer
      title="OnBoard"
      crumbs={[
        {
          href: "/",
          label: "OnBoard",
        },
      ]}
    >
      {account && (
        <OnBoardStepperForm
          onSubmit={mutateAsync}
          submitting={isPending}
          initialValues={account as unknown as AccountFormValues}
        />
      )}
    </PageContainer>
  );
};

export default OnBoardPage;
