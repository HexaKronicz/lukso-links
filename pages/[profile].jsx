import { Stack, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";
import SocialProfileSimple from "../components/card";

export default function WithBackgroundImage() {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      bgGradient="linear(to-r, green.200, pink.500)"
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"center"} spacing={6}>
          <SocialProfileSimple />
        </Stack>
      </VStack>
    </Flex>
  );
}
