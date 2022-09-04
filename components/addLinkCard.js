import {
  Box,
  useColorModeValue,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function AddLinkCard({ edit, link }) {
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (edit) {
      setEditMode(true);
    }
  }, [edit]);
  console.log(link);
  return (
    <Box
      mb={18}
      maxW={"520px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
    >
      {edit && <h1>Edit link</h1>}
      <Stack spacing={5}>
        <FormControl id="email">
          <FormLabel>Title</FormLabel>
          {edit ? (
            <Input type="email" />
          ) : (
            <Text justifyContent={start}>{link.title}</Text>
          )}
        </FormControl>
        <FormControl id="password">
          <FormLabel>URL</FormLabel>
          <Input type="password" />
        </FormControl>
        <Stack spacing={1}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            {edit ? "Save" : "Edit"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
