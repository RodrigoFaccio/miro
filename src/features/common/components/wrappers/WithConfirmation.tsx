import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type Props = {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const WithConfirmation: React.FC<PropsWithChildren<Props>> = ({
  children,
  title = "Confirmação",
  message = "Você tem certeza que deseja realizar essa ação?",
  onConfirm,
  onCancel = () => {},
}) => {
  return (
    <Popover placement="bottom-end">
      {({ onClose }) => (
        <>
          <PopoverTrigger>{children}</PopoverTrigger>
          <Portal>
            <PopoverContent
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PopoverArrow />
              <PopoverHeader>
                <Text fontWeight="bold">{title}</Text>
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Text fontSize="sm">{message}</Text>
              </PopoverBody>
              <PopoverFooter>
                <HStack gap={3} justify="flex-end">
                  <Button
                    colorScheme="gray"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                      onCancel();
                    }}
                    size="xs"
                  >
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                      onConfirm();
                    }}
                    size="xs"
                  >
                    Confirmar
                  </Button>
                </HStack>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};

export default WithConfirmation;
