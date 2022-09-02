import { Box } from "@chakra-ui/react";

export default function LinkBox({ title }) {
  return (
    <Box bg="tomato" w="100%" p={4} color="white" mt={3} borderRadius={5}>
      {title}
    </Box>
  );
}
