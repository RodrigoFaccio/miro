import PageContainer from "@/features/common/components/layout/PageContainer";
import TransactionsTable from "@/features/transactions/components/TransactionsTable";

const TransactionsPage = () => {
  return (
    <PageContainer
      title="Transações"
      crumbs={[
        {
          href: "/transactions",
          label: "Transações",
        },
      ]}
    >
      <TransactionsTable />
    </PageContainer>
  );
};

export default TransactionsPage;
