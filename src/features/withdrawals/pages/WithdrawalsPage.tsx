import PageContainer from "@/features/common/components/layout/PageContainer";
import AutomaticWithdrawalAmountForm from "@/features/withdrawals/components/AutomaticWithdrawAmountForm";
import WithdrawalsTable from "@/features/withdrawals/components/WithdrawalsTable";
import {
  enableAutomaticWithdrawal,
  setAutomaticWithdrawalAmount,
} from "@/features/withdrawals/services";
import { WithdrawalType } from "@/features/withdrawals/types";
import {
  Button,
  ButtonGroup,
  Checkbox,
  HStack,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

const WithdrawalsPage = () => {
  const [isWithdrawEnabled, setIsWithdrawEnabled] = useState(false);

  const toast = useToast();

  const { mutateAsync: mutateEnableAutoWithdraw, isPending: isEnabling } =
    useMutation({
      mutationFn: enableAutomaticWithdrawal,
      onSuccess: (_, enabled) => {
        setIsWithdrawEnabled(enabled);
        toast({
          title: "Sucesso",
          description: `Saque automático ${enabled ? "ativado" : "desativado"}`,
          status: "success",
        });
      },
      onError: () => {
        toast({
          title: "Erro",
          description: "Erro ao salvar configuração",
        });
      },
    });

  return (
    <PageContainer
      crumbs={[
        {
          href: "/withdrawals",
          label: "Saques",
        },
      ]}
    >
      <HStack
        mb={6}
        _empty={{ display: "none" }}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Heading fontWeight="bold">Saques</Heading>
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          colorScheme="gray"
          bg={useColorModeValue("white", "transparent")}
          rounded="md"
        >
          <Checkbox
            size="sm"
            as={Button}
            _hover={{
              bg: useColorModeValue("white", "transparent"),
            }}
            isLoading={isEnabling}
            loadingText="Salvando..."
            isChecked={isWithdrawEnabled}
            onChange={(event) => {
              mutateEnableAutoWithdraw(event.target.checked);
            }}
          >
            <Text
              fontWeight={600}
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="sm"
            >
              Saque automático
            </Text>
          </Checkbox>

          <Popover placement="bottom-end">
            {({ onClose }) => (
              <>
                <PopoverTrigger>
                  <IconButton
                    aria-label="auto-withdrawals"
                    icon={<Icon as={IoSettingsOutline} />}
                    isDisabled={!isWithdrawEnabled || isEnabling}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    <AutomaticWithdrawalAmountForm
                      defaultValues={{ amount: 0 }}
                      onSubmit={setAutomaticWithdrawalAmount}
                      onCancel={onClose}
                      onError={() => {
                        toast({
                          title: "Erro",
                          description: "Erro ao salvar configuração",
                        });
                      }}
                      onSuccess={() => {
                        toast({
                          title: "Sucesso",
                          description: "Configuração salva com sucesso",
                          status: "success",
                        });
                        onClose();
                      }}
                    />
                  </PopoverBody>
                </PopoverContent>
              </>
            )}
          </Popover>
        </ButtonGroup>
      </HStack>
      <WithdrawalsTable type={WithdrawalType.DEFAULT} />
    </PageContainer>
  );
};

export default WithdrawalsPage;
