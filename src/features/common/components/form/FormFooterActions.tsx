import { Button, Flex, HStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type FormFooterActionsProps = {
  onCancel?: () => void;
  actionLabel?: string;
  cancelLabel?: string;
};

const FormFooterActions: React.FC<FormFooterActionsProps> = ({
  onCancel,
  actionLabel = "Salvar",
  cancelLabel = "Cancelar",
}) => {
  const form = useFormContext();

  return (
    <Flex justifyContent="flex-end" mt={4}>
      <HStack spacing={3}>
        {onCancel && (
          <Button variant="outline" colorScheme="gray" onClick={onCancel}>
            {cancelLabel}
          </Button>
        )}
        <Button
          isLoading={form.formState.isSubmitting}
          type="submit"
          variant="solid"
          colorScheme="primary"
        >
          {actionLabel}
        </Button>
      </HStack>
    </Flex>
  );
};

export default FormFooterActions;
