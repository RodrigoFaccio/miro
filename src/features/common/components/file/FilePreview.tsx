import { FileFormField } from "@/features/common/types/form";
import { formatBytes } from "@/features/common/utils/formatters";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardProps,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Icon,
  IconButton,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { FaFileAlt, FaTrash } from "react-icons/fa";

type FilePreviewProps = {
  file: FileFormField;
  onDelete?: () => void;
  onNameChange?: (name: string) => void;
} & CardProps;

const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onDelete,
  onNameChange,
  ...props
}) => {
  return (
    <Card variant="outline" p={3} px={4} {...props}>
      <HStack gap={3} w="full">
        <Icon as={FaFileAlt} color="gray.500" boxSize={6} />
        <Stack flex={1} gap={1} overflow="hidden" p={1}>
          <Editable
            fontWeight="bold"
            fontSize="sm"
            defaultValue={file.name}
            startWithEditView
            isPreviewFocusable={file instanceof File}
          >
            <EditablePreview w="full" />
            <EditableInput
              w="full"
              onBlur={(e) => onNameChange?.(e.target.value)}
            />
          </Editable>
          {file instanceof File ? (
            <Text fontSize="2xs" py={1} color="gray.500">
              {formatBytes(file.size)}
            </Text>
          ) : (
            <Box>
              <Tag size={"sm"} variant="subtle" m={0} colorScheme="primary">
                <TagLeftIcon boxSize="10px" as={CheckIcon} />
                <TagLabel>Arquivo salvo</TagLabel>
              </Tag>
            </Box>
          )}
        </Stack>
        {onDelete && (
          <IconButton
            aria-label="Remover arquivo"
            icon={<FaTrash />}
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={onDelete}
          />
        )}
      </HStack>
    </Card>
  );
};

export default FilePreview;
