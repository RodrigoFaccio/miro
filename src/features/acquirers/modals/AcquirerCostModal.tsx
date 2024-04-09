import AcquirerCostForm from "@/features/acquirers/components/AcquirerCostForm";
import { useAcquirer } from "@/features/acquirers/hooks/UseAcquirer";
import { AcquirerCostFormValues } from "@/features/acquirers/schemas/AcquirerCostFormSchema";
import { updateAcquirer } from "@/features/acquirers/services";
import {
  Alert,
  AlertIcon,
  Avatar,
  Card,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  id?: number;
  isOpen: boolean;
  onClose: () => void;
};

const AcquirerCostModal: React.FC<Props> = ({ id, isOpen, onClose }) => {
  const { data: acquirer, status } = useAcquirer(id);

  const queryClient = useQueryClient();

  const toast = useToast();

  const onSuccess = () => {
    toast({
      title: "Custo atualizado com sucesso",
      status: "success",
    });

    queryClient.invalidateQueries({ queryKey: ["acquirer.fees", { id }] });

    onClose();
  };

  const onError = () => {
    toast({
      title: "Ocorreu um erro ao atualizar o custo",
      status: "error",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack gap={3}>
            <Avatar size="md" name={acquirer?.name} />
            <Stack>
              <Heading size="sm" noOfLines={1}>
                Adicionar Custo
              </Heading>
              <Text fontSize="xs" color="gray.500">
                {acquirer?.name}
              </Text>
            </Stack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          {status === "pending" && (
            <Flex minH={120} align="center" justify="center">
              <Spinner color="primary.500" />
            </Flex>
          )}
          {status === "error" && (
            <Alert status="error">
              <AlertIcon />
              Ocorreu um erro ao carregar as taxas
            </Alert>
          )} <Tabs
          colorScheme="primary"
          variant="soft-rounded"
          defaultIndex={0}
        >
          <TabList
            as={Card}
            rounded="xl"
            gap={3}
            p={3}
            overflowX="auto"
          >
            <Tab rounded="xl">Custos</Tab>
            <Tab rounded="xl">Bandeira 1</Tab>
            <Tab rounded="xl">Bandeira 2</Tab>
          </TabList>
          <TabPanels>

            <TabPanel px={1}>
            {status === "success" && acquirer && (
            <AcquirerCostForm
            defaultValues={{
              costPixFixed: Number(acquirer.costPixFixed),
              costPixPercentage: Number(acquirer.costPixPercentage),
              costTicketFixed: Number(acquirer.costTicketFixed),
              costTicketPercentage: Number(acquirer.costTicketPercentage),
              costCreditCard2x: Number(acquirer.costCreditCard2x),
              costCreditCard3x: Number(acquirer.costCreditCard3x),
              costCreditCard4x: Number(acquirer.costCreditCard4x),
              costCreditCard5x: Number(acquirer.costCreditCard5x),
              costCreditCard6x: Number(acquirer.costCreditCard6x),
              costCreditCard7x: Number(acquirer.costCreditCard7x),
              costCreditCard8x: Number(acquirer.costCreditCard8x),
              costCreditCard9x: Number(acquirer.costCreditCard9x),
              costCreditCard10x: Number(acquirer.costCreditCard10x),
              costCreditCard11x: Number(acquirer.costCreditCard11x),
              costCreditCard12x: Number(acquirer.costCreditCard12x),
              costCreditCardFixed:Number(acquirer.costCreditCardFixed),
              costCreditCardPercentage:Number(acquirer.costCreditCardPercentage), 
            }}
            onCancel={onClose}
            onSubmit={(values: AcquirerCostFormValues) =>
              updateAcquirer(id as number, {
                costPixFixed: values.costPixFixed.toString(),
                costPixPercentage: values.costPixPercentage.toString(),
                costTicketFixed: values.costTicketFixed.toString(),
                costTicketPercentage: values.costTicketPercentage.toString(),
                costCreditCardFixed: values.costCreditCardFixed.toString(),
                costCreditCardPercentage: values.costCreditCardPercentage.toString(),
                costCreditCard2x: values.costCreditCard2x.toString(),
                costCreditCard3x: values.costCreditCard3x.toString(),
                costCreditCard4x: values.costCreditCard4x.toString(),
                costCreditCard5x: values.costCreditCard5x.toString(),
                costCreditCard6x: values.costCreditCard6x.toString(),
                costCreditCard7x: values.costCreditCard7x.toString(),
                costCreditCard8x: values.costCreditCard8x.toString(),
                costCreditCard9x: values.costCreditCard9x.toString(),
                costCreditCard10x: values.costCreditCard10x.toString(),
                costCreditCard11x: values.costCreditCard11x.toString(),
                costCreditCard12x: values.costCreditCard12x.toString(),
               
              })
            }
            onError={onError}
            onSuccess={onSuccess}
          />
          
          )}
              </TabPanel>
        </TabPanels>

            
            
            
              
            
                
             
        </Tabs>

          
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AcquirerCostModal;
