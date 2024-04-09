import PageContainer from "@/features/common/components/layout/PageContainer";
import CustomerDetails from "@/features/customers/components/CustomerDetails";
import { getCustomer } from "@/features/customers/services";
import { Alert, AlertDescription, AlertIcon, Progress } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const CustomerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["customer", { id }],
    queryFn: () => getCustomer(parseInt(id as string)),
    enabled: !!id,
    initialData: undefined,
  });

  return (
    <PageContainer
      title="Detalhes do cliente"
      crumbs={[
        {
          href: "/customers",
          label: "Clientes",
        },
        {
          href: "/customers/:id",
          label: "Detalhes",
        },
      ]}
    >
      {isFetching && (
        <Progress
          size="xs"
          isIndeterminate
          colorScheme="primary"
          mb={3}
          rounded="md"
        />
      )}
      {isError && (
        <Alert variant={"left-accent"} status="error">
          <AlertIcon />
          <AlertDescription>Erro ao carregar cliente</AlertDescription>
        </Alert>
      )}
      {data && <CustomerDetails {...data} />}
    </PageContainer>
  );
};

export default CustomerDetailsPage;
