import AcquirerCard from "@/features/acquirers/components/AcquirerCard";
import useAcquirers from "@/features/acquirers/hooks/UseAcquirers";
import AcquirerApiKeyModal from "@/features/acquirers/modals/AcquirerApiKeyModal";
import AcquirerCostModal from "@/features/acquirers/modals/AcquirerCostModal";
import AcquirerFeesModal from "@/features/acquirers/modals/AcquirerFeesModal";
import { Acquirer } from "@/features/acquirers/types";
import PageContainer from "@/features/common/components/layout/PageContainer";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Progress,
  SimpleGrid,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const AcquirersPage = () => {
  const [selectedAcquirer, setSelectedAcquirer] = useState<Acquirer | null>(
    null
  );

  const {
    isOpen: acquirerFeeModalIsOpen,
    onOpen: onAcquirerFeeModalOpen,
    onClose: onAcquirerFeeModalClose,
  } = useDisclosure();
  const {
    isOpen: acquirerCostModalIsOpen,
    onOpen: onAcquirerCostModalOpen,
    onClose: onAcquirerCostModalClose,
  } = useDisclosure();

  const {
    isOpen: acquirerApiKeyModalIsOpen,
    onOpen: onAcquirerApiKeyModalOpen,
    onClose: onAcquirerApiKeyModalClose,
  } = useDisclosure();

  const {
    data: { results: acquirers },
    isFetching,
    isFetched,
    refetch
  } = useAcquirers();
  const closeCost = ()=>{
    refetch
    onAcquirerCostModalClose()
  }
  return (
    <PageContainer
      title="Suas Adquirentes"
      crumbs={[
        {
          href: "/acquirers",
          label: "Adquirentes",
        },
      ]}
    >
      <Alert status="info" rounded="lg">
        <AlertIcon />
        <AlertDescription>
          Aqui estão todas as suas adquirentes configuradas. Caso queira
          adicionar mais opções, entre em contato com nosso time.
        </AlertDescription>
      </Alert>
      <Stack mt={5} spacing={4}>
        {!isFetched && isFetching && (
          <Progress size="xs" isIndeterminate colorScheme="primary" />
        )}
        <SimpleGrid
          columns={{
            base: 1,
            lg: 2,
          }}
          gap={4}
        >
          {acquirers.map((acquirer) => (
            <AcquirerCard
            onChangeCostClick={()=>{
              setSelectedAcquirer(acquirer);
              onAcquirerCostModalOpen()

            }}
              key={acquirer.id}
              acquirer={acquirer}
              onChangeFeeClick={() => {
                setSelectedAcquirer(acquirer);
                onAcquirerFeeModalOpen();
              }}
              onApiKeyClick={() => {
                setSelectedAcquirer(acquirer);
                onAcquirerApiKeyModalOpen();
              }}
            />
          ))}
        </SimpleGrid>
      </Stack>
      <AcquirerFeesModal
        id={selectedAcquirer?.id}
        isOpen={acquirerFeeModalIsOpen}
        onClose={onAcquirerFeeModalClose}
      />
      <AcquirerApiKeyModal
        id={selectedAcquirer?.id}
        isOpen={acquirerApiKeyModalIsOpen}
        onClose={onAcquirerApiKeyModalClose}
      />
      {
        acquirerCostModalIsOpen &&(
          <AcquirerCostModal
          id={selectedAcquirer?.id}
          isOpen={acquirerCostModalIsOpen}
          onClose={closeCost}
          
        />
        )
      }
     
    </PageContainer>
  );
};

export default AcquirersPage;
