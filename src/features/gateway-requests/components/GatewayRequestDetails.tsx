import TableBuilder from "@/features/common/components/table/TableBuilder";
import ListItem from "@/features/common/components/widgets/ListItem";
import {
  formatCNPJ,
  formatCPF,
  formatCurrency,
  formatPhone,
} from "@/features/common/utils/formatters";
import { CompanyStatus, SentFile } from "@/features/companies/types";
import GatewayRequestAnswerModal, {
  GatewayRequestAnswerAction,
} from "@/features/gateway-requests/modals/GatewayRequestAnswerModal";
import { GatewayRequest } from "@/features/gateway-requests/types";
import { DownloadIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import { useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { IoMdLocate } from "react-icons/io";
import {
  MdCheck,
  MdClose,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";

const helper = createColumnHelper<SentFile>();

type Props = {
  request: GatewayRequest;
  onClose: () => void;
};

const GatewayRequestDetails: React.FC<Props> = ({ request, onClose }) => {
  const [action, setAction] = useState<GatewayRequestAnswerAction>(
    GatewayRequestAnswerAction.APPROVE
  );

  const {
    isOpen: isOpenRequestAnswer,
    onOpen: openRequestAnswer,
    onClose: closeRequestAnswer,
  } = useDisclosure();

  return (
    <>
      <Stack>
        <Card variant="outline" overflow="hidden" rounded="lg" bg="transparent">
          <Accordion allowToggle size="lg" defaultIndex={[0]}>
            <AccordionItem borderTop="none">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <HStack gap={3}>
                    <Icon as={FaRegBuilding} boxSize={4} color="primary.400" />
                    <Text fontWeight="semibold">Informações da Empresa</Text>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack gap={4}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <ListItem
                      primary="CNPJ"
                      secondary={formatCNPJ(request.cnpj) || "Não informado"}
                    />
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <ListItem
                      primary="Nome Comercial"
                      secondary={request.commercialName || "Não informado"}
                    />
                    <ListItem
                      primary="Razão Social"
                      secondary={request.companyLegalName || "Não informado"}
                    />
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <ListItem
                      primary="CPF"
                      secondary={formatCPF(request.cpf)}
                    />
                    <ListItem
                      primary="Data de Nascimento"
                      secondary={moment(request.birthDate).format("DD/MM/YYYY")}
                    />
                  </SimpleGrid>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <ListItem primary="Nome" secondary={request.first_name} />
                    <ListItem
                      primary="Sobrenome"
                      secondary={request.last_name}
                    />
                  </SimpleGrid>

                  <ListItem
                    primary="Nome da Mãe"
                    secondary={request.motherName}
                  />

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <ListItem primary="Email" secondary={request.email} />
                    <ListItem
                      primary="Telefone"
                      secondary={formatPhone(request.contactPhone)}
                    />
                  </SimpleGrid>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <HStack gap={3}>
                    <Icon as={IoMdLocate} boxSize={4} color="primary.400" />
                    <Text fontWeight="semibold">Endereço da Empresa</Text>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Stack gap={4}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <ListItem
                      primary="CEP"
                      secondary={request.cep || "Não informado"}
                    />
                    <ListItem
                      primary="Número"
                      secondary={request.number || "Não informado"}
                    />
                  </SimpleGrid>

                  <ListItem primary="Rua" secondary={request.address} />

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <ListItem
                      primary="Bairro"
                      secondary={request.neighborhood}
                    />
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <ListItem
                      primary="Cidade"
                      secondary={request.city || "Não informado"}
                    />
                    <ListItem
                      primary="Estado"
                      secondary={request.state || "Não informado"}
                    />
                  </SimpleGrid>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <HStack gap={3}>
                    <Icon
                      as={MdOutlineAccountBalanceWallet}
                      boxSize={4}
                      color="primary.400"
                    />
                    <Text fontWeight="semibold">Faturamento e Contato</Text>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Stack gap={4}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <ListItem
                      primary="Faturamento Médio"
                      secondary={formatCurrency(request.averageRevenue || 0)}
                    />
                    <ListItem
                      primary="Ticket Médio"
                      secondary={formatCurrency(request.averageTicket || 0)}
                    />
                    <ListItem
                      primary="Telefone Comercial"
                      secondary={formatPhone(request.contactPhone)}
                    />
                    <ListItem
                      primary="Email Comercial"
                      secondary={request.contactEmail}
                    />
                  </SimpleGrid>

                  <ListItem
                    primary="Site"
                    secondary={request.site || "Não informado"}
                  />
                  <ListItem
                    primary="Produtos que vende"
                    secondary={request.productsSelling || "Não informado"}
                  />
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderBottom="none">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <HStack gap={3}>
                    <Icon as={GrDocumentText} boxSize={4} color="primary.400" />
                    <Text fontWeight="semibold">Documentos</Text>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <TableBuilder
                  enableColumnFilters={false}
                  columns={
                    [
                      helper.accessor("name", {
                        header: "Nome",
                      }),
                      helper.accessor("id", {
                        cell: ({ row }) => (
                          <Flex justify="flex-end">
                            <IconButton
                              as={Link}
                              href={row.original.file}
                              target="_blank"
                              download={row.original.name}
                              colorScheme="primary"
                              aria-label="Download"
                              rounded="full"
                              size="sm"
                              icon={<DownloadIcon />}
                            />
                          </Flex>
                        ),
                        header: "",
                      }),
                    ] as ColumnDef<SentFile>[]
                  }
                  data={request.documents as SentFile[]}
                  enableRowSelection={false}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
        <HStack justify="flex-end" mt={5}>
          <Button colorScheme="gray" variant="outline" onClick={onClose}>
            Fechar
          </Button>
          {request.status !== CompanyStatus.APPROVED && (
            <Button
              colorScheme="green"
              leftIcon={<Icon as={MdCheck} />}
              onClick={() => {
                setAction(GatewayRequestAnswerAction.APPROVE);
                openRequestAnswer();
              }}
            >
              Aprovar
            </Button>
          )}
          {request.status !== CompanyStatus.REJECTED && (
            <Button
              colorScheme="red"
              leftIcon={<Icon as={MdClose} />}
              onClick={() => {
                setAction(GatewayRequestAnswerAction.REJECT);
                openRequestAnswer();
              }}
            >
              Rejeitar
            </Button>
          )}
        </HStack>
      </Stack>
      <GatewayRequestAnswerModal
        open={isOpenRequestAnswer}
        onClose={closeRequestAnswer}
        onSuccess={onClose}
        request={request}
        action={action}
      />
    </>
  );
};

export default GatewayRequestDetails;
