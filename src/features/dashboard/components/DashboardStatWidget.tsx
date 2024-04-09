import {
  As,
  Card,
  CardBody,
  ColorProps,
  Flex,
  Icon,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type DashboardStatWidgetProps = {
  title: string;
  subtitle?: string | React.ReactNode;
  footer?: React.ReactNode;
  stat: string;
  icon?: As;
  tag?: string;
  color: ColorProps["color"];
};

const DashboardStatWidget: React.FC<DashboardStatWidgetProps> = ({
  title,
  subtitle,
  stat,
  icon,
  tag,
  color,
  footer,
}) => {
  return (
    <Card
      borderLeft="4px solid"
      borderColor={color}
      p={1}
      bg={useColorModeValue("white", "gray.800")}
      rounded={"xl"}
      position="relative"
      overflow="hidden"
    >
      <CardBody>
        <Flex direction="column" gap={2} alignItems="flex-start" flex={1}>
          <Text fontSize="sm" fontWeight="thin" color="gray.500">
            {title}
          </Text>
          <Text fontSize="3xl" fontWeight="bold" noOfLines={1} isTruncated>
            {stat}
          </Text>
          <Text fontSize="sm" fontWeight="thin" color="gray.500" w="full">
            {subtitle}
          </Text>
          {icon && (
            <Flex position="absolute" right={3} top={3}>
              <Card rounded={"full"} p={3} m={0}>
                <Icon w={6} h={6} as={icon} color={color} />
              </Card>
            </Flex>
          )}
          {tag && (
            <Flex position="absolute" right={3} bottom={6}>
              <Tag size="sm" variant="subtle" color={color}>
                <TagLabel>{tag}</TagLabel>
              </Tag>
            </Flex>
          )}
          {footer && footer}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default DashboardStatWidget;

