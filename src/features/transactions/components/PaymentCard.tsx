import ListItem from "@/features/common/components/widgets/ListItem";
import PaymentMethodTag from "@/features/transactions/components/PaymentMethodTag";
import {
  PaymentMethod,
  ReadTransactionResponse,
} from "@/features/transactions/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { QRCodeSVG } from "qrcode.react";
import { BsQrCode } from "react-icons/bs";

type Props = {
  transaction: ReadTransactionResponse;
} & React.ComponentProps<typeof Card>;

const PaymentCard: React.FC<Props> = ({ transaction, ...props }) => {
  return (
    <Card variant="outline" {...props}>
      <CardBody>
        <VStack alignItems="flex-start" spacing={3}>
          <Text fontSize="sm" fontWeight="light" color="gray.500">
            Forma de pagamento
          </Text>
          <HStack>
            <PaymentMethodTag paymentMethod={transaction.paymentMethod} />
            {transaction.paymentMethod === PaymentMethod.CREDIT_CARD && (
              <Text
                fontSize="xs"
                fontWeight="light"
                color="gray.500"
                noOfLines={1}
              >
                {transaction.installments > 1 ? (
                  <>em {transaction.installments} parcelas</>
                ) : (
                  <>à vista</>
                )}
              </Text>
            )}
          </HStack>
        </VStack>

        <Divider color="gray.200" my={5} />

        <SimpleGrid
          columns={{
            base: 1,
            md: 3,
          }}
          gap={5}
          alignItems="flex-start"
        >
          <ListItem
            primary="Data da transação"
            secondary={moment(transaction.createdAt).format("DD [de] MMMM")}
          />
          <ListItem
            primary="Vencimento"
            secondary={moment(transaction.updatedAt).format("DD [de] MMMM")}
          />

          {transaction.paymentMethod === PaymentMethod.PIX && (
            <Stack gap={2} alignItems="flex-start">
              <ListItem
                primary="Código PIX"
                secondary={transaction.pix?.qrCode || "Não disponível"}
                copyable
              />
              <Popover>
                <PopoverTrigger>
                  <Button
                    leftIcon={<BsQrCode />}
                    size="xs"
                    colorScheme="primary"
                  >
                    Ver QR Code
                  </Button>
                </PopoverTrigger>
                <PopoverContent w={300} p={0}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>
                    <PaymentMethodTag paymentMethod={PaymentMethod.PIX} />
                  </PopoverHeader>
                  <PopoverBody p={0}>
                    <QRCodeSVG
                      value={transaction.pix?.qrCode || ""}
                      size={300}
                      includeMargin
                    />
                  </PopoverBody>
                  <PopoverFooter>
                    <Text fontSize="xs" color="gray.500">
                      Expira em{" "}
                      {moment(transaction.pix?.expirationDate).format(
                        "DD/MM/YYYY à\\s HH:mm"
                      )}
                    </Text>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </Stack>
          )}

          {transaction.paymentMethod === PaymentMethod.TICKET && (
            <Stack gap={2} alignItems="flex-start">
              <ListItem
                primary="Código de barras"
                secondary={transaction.boleto?.barcode || "Não disponível"}
                copyable
              />
              <Button
                leftIcon={<ExternalLinkIcon />}
                size="xs"
                colorScheme="primary"
                as={"a"}
                href={transaction.boleto?.boletoUrl || ""}
                target="_blank"
              >
                Link do boleto
              </Button>
            </Stack>
          )}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default PaymentCard;
