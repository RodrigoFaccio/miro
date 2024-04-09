import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  BreadcrumbLink,
  Container,
  ContainerProps,
  Flex,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";

type PageContainerProps = Partial<Omit<ContainerProps, "title">> & {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children: React.ReactNode;
  crumbs: (BreadcrumbItemProps & {
    href: string;
    label: string | React.ReactNode;
  })[];
};

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  crumbs,
  children,
  ...props
}) => {
  return (
    <Container maxW="container.xl" py={5} {...props}>
      <Flex flexDirection="column" gap={5}>
        <Breadcrumb fontWeight={"medium"} fontSize={"sm"}>
          <BreadcrumbItem>
            <BreadcrumbLink to="/" as={NavLink}>
              <Flex>
                <Icon color="primary.500" as={IoHome} />
              </Flex>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {crumbs.map((crumb, index) => (
            <BreadcrumbItem key={index} {...crumb}>
              <BreadcrumbLink to={crumb.href} as={NavLink}>
                <Flex alignItems="center">{crumb.label}</Flex>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Stack mb={2} _empty={{ display: "none" }}>
          {title && <Heading fontWeight="bold">{title}</Heading>}
          {subtitle && (
            <Heading fontSize="sm" color="gray.500">
              {subtitle}
            </Heading>
          )}
        </Stack>
        <Box maxW="full" position="relative">
          {children}
        </Box>
      </Flex>
    </Container>
  );
};

export default PageContainer;
