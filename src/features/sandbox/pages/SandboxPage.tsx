import PageContainer from "@/features/common/components/layout/PageContainer";
import ItemTable from "@/features/sandbox/components/ItemTable";

const SandboxPage = () => {
  return (
    <PageContainer
      title="Sandbox"
      crumbs={[{ href: "/sandbox", label: "Sandbox" }]}
    >
      <ItemTable />
    </PageContainer>
  );
};

export default SandboxPage;
