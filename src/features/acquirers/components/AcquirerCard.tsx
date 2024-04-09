import { enablePaymentMethodsForAcquirer } from "@/features/acquirers/services";
import { Acquirer } from "@/features/acquirers/types";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Switch,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoKeySharp } from "react-icons/io5";
import { MdBlock, MdCheck } from "react-icons/md";

type Props = {
  acquirer: Acquirer;
  onChangeFeeClick: () => void;
  onChangeCostClick: () => void;

  onApiKeyClick: () => void;
};

const AcquirerCard: React.FC<Props> = ({
  acquirer,
  onChangeFeeClick,
  onChangeCostClick,
  onApiKeyClick,
}) => {
  const queryClient = useQueryClient();

  const [internalAcquirer, setInternalAcquirer] = useState<Acquirer>(acquirer);

  const handleChangeEnabled = (field: keyof Acquirer, value: boolean) => {
    setInternalAcquirer({
      ...internalAcquirer,
      [field]: value,
    });
    enablePaymentMethodsForAcquirer(acquirer.id, {
      [field]: value,
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ["acquirers"] });
    });
  };

  useEffect(() => {
    setInternalAcquirer(acquirer);
  }, [acquirer]);

  return (
    <Card size="lg" variant="outline" rounded="xl" border="none">
      <CardHeader>
        <HStack
          justify="space-between"
          flexDirection={{
            base: "column",
            md: "row",
          }}
          align="flex-start"
          gap={5}
        >
          <HStack justify="space-between" gap={5}>
            <Avatar size="xl" name={acquirer.name} />
            <Stack>
              <Heading size="lg" noOfLines={1}>
                {acquirer.name}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                desde {moment(acquirer.createdAt).format("DD/MM/YYYY")}
              </Text>
            </Stack>
          </HStack>
          <Tag
            colorScheme={acquirer.enabled ? "green" : "red"}
            variant="subtle"
          >
            <TagLeftIcon as={acquirer.enabled ? MdCheck : MdBlock} />
            <TagLabel>{acquirer.enabled ? "Ativo" : "Inativo"}</TagLabel>
          </Tag>
        </HStack>
      </CardHeader>
      <CardBody
        as={HStack}
        justify="space-between"
        gap={5}
        pt={0}
        flexWrap="wrap"
      >
        <HStack gap={5}>
          <Stack>
            <Text fontSize="xs" fontFamily="monospace">
              Cartão
            </Text>
            <Switch
              colorScheme="primary"
              isChecked={internalAcquirer.creditCardEnabled}
              onChange={(e) => {
                handleChangeEnabled("creditCardEnabled", e.target.checked);
              }}
            />
          </Stack>
          <Stack>
            <Text fontSize="xs" fontFamily="monospace">
              Boleto
            </Text>
            <Switch
              colorScheme="primary"
              isChecked={internalAcquirer.ticketEnabled}
              onChange={(e) => {
                handleChangeEnabled("ticketEnabled", e.target.checked);
              }}
            />
          </Stack>
          <Stack>
            <Text fontSize="xs" fontFamily="monospace">
              Pix
            </Text>
            <Switch
              colorScheme="primary"
              isChecked={internalAcquirer.pixEnabled}
              onChange={(e) => {
                handleChangeEnabled("pixEnabled", e.target.checked);
              }}
            />
          </Stack>
          <Stack>
            <Text fontSize="xs" fontFamily="monospace">
              Cash Out
            </Text>
            <Switch
              colorScheme="primary"
              isChecked={internalAcquirer.cashoutEnabled}
              onChange={(e) => {
                handleChangeEnabled("cashoutEnabled", e.target.checked);
              }}
            />
          </Stack>
        </HStack>
        <HStack flexWrap="wrap" gap={3}>
          <Button
            colorScheme="primary"
            variant="outline"
            leftIcon={<IoKeySharp />}
            onClick={() => onApiKeyClick()}
          >
            Chaves de API
          </Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Ações
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onChangeFeeClick()}>
                Definir Taxa Padrão
              </MenuItem>
              <MenuItem onClick={() => onChangeCostClick()}>
                Adicionar custo
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default AcquirerCard;
