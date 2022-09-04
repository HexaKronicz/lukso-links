import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import LinkBox from "./link";

export default function ProfileCard({ links, name, intro, picture }) {
  return (
    <Center py={6} pt={12}>
      <Box
        maxW={"320px"}
        w={"320px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={picture || "https://i.imgur.com/5QI9Ury.jpeg"}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {name}
        </Heading>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {intro}
        </Text>
        {links.map((l) => (
          <LinkBox title={l.title} key={l.id} />
        ))}
      </Box>
    </Center>
  );
}
