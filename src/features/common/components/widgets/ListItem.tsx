import { CopyIcon } from "@chakra-ui/icons";
import {
  Avatar,
  HStack,
  Icon,
  Stack,
  StackProps,
  Text,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
  primary: string;
  secondary?: string;
  icon?: IconType;
  avatar?: string;
  copyable?: boolean;
} & StackProps;

const ListItem: React.FC<Props> = ({
  primary,
  secondary,
  icon,
  avatar,
  copyable = false,
  ...props
}) => {
  const { onCopy, hasCopied } = useClipboard(secondary || "");

  return (
    <HStack gap={3} w="full" {...props}>
      {icon && <Icon as={icon} color="gray.500" boxSize={6} />}
      {avatar && <Avatar size="sm" name={avatar} />}
      <Stack gap={1} overflow="hidden">
        <HStack>
          <Text fontSize="sm" fontWeight="light" color="gray.500" noOfLines={1}>
            {primary}
          </Text>
          {copyable && (
            <Tooltip label="Copiar" placement="top" hasArrow rounded="md">
              <CopyIcon
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                onClick={onCopy}
              />
            </Tooltip>
          )}
        </HStack>
        <Tooltip label={secondary} placement="top" hasArrow rounded="md">
          <Text
            fontSize="sm"
            fontWeight="semibold"
            noOfLines={1}
            cursor="pointer"
            onClick={onCopy}
          >
            {hasCopied ? (
              <Text as="span" color="green.500" fontWeight="thin">
                Copiado
              </Text>
            ) : (
              secondary
            )}
          </Text>
        </Tooltip>
      </Stack>
    </HStack>
  );
};

export default ListItem;
