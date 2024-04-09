import { Image, Stack } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <Stack gap={3} align="center" justify="center" w="100%" h="100%" p={5}>
      <Image src="/404.svg" alt="Página não encontrada" w={500} h={500} />
    </Stack>
  );
};

export default NotFoundPage;
