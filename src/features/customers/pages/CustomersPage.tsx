import PageContainer from "@/features/common/components/layout/PageContainer";
import CustomersTable from "@/features/customers/components/CustomersTable";

const CustomersPage = () => {
  return (
    <PageContainer
      title="Clientes"
      crumbs={[
        {
          href: "/customers",
          label: "Clientes",
        },
      ]}
    >
      <CustomersTable />
    </PageContainer>
  );
};

export default CustomersPage;
