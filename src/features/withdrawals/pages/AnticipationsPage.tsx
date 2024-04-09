import PageContainer from "@/features/common/components/layout/PageContainer";
import WithdrawalsTable from "@/features/withdrawals/components/WithdrawalsTable";
import { WithdrawalType } from "@/features/withdrawals/types";

const AnticipationsPage = () => {
  return (
    <PageContainer
      title="Antecipações"
      crumbs={[
        {
          href: "/anticipations",
          label: "Antecipações",
        },
      ]}
    >
      <WithdrawalsTable type={WithdrawalType.ANTICIPATION} />
    </PageContainer>
  );
};

export default AnticipationsPage;
