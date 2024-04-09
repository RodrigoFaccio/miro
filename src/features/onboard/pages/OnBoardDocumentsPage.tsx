import PageContainer from "@/features/common/components/layout/PageContainer";

const OnBoardDocumentsPage = () => {
  return (
    <PageContainer
      title="OnBoard"
      crumbs={[
        {
          href: "/",
          label: "Envio de documentos",
        },
      ]}
    >
      Documents
    </PageContainer>
  );
};

export default OnBoardDocumentsPage;
