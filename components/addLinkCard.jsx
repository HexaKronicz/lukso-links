import {
  Box,
  useColorModeValue,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

export default function AddLinkCard({
  edit,
  link,
  add,
  addLink,
  updateLink,
  deleteLink,
}) {
  const [editMode, setEditMode] = useState(false);
  const titleRef = useRef();
  const urlRef = useRef();
  const idRef = useRef();

  useEffect(() => {
    if (edit) {
      setEditMode(true);
    }
  }, [edit]);

  const onSubmit = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const url = urlRef.current.value;

    if (!title) {
      alert("Please add a title");
      return;
    }

    addLink({ title, url });

    titleRef.current.value = "";
    urlRef.current.value = "";
  };

  const onSave = (e) => {
    e.preventDefault();

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const url = urlRef.current.value;

    if (!title) {
      alert("Please add a title");
      return;
    }

    updateLink({ id, title, url });
    setEditMode((editMode) => !editMode);
  };

  const onDelete = (e) => {
    e.preventDefault();

    const id = idRef.current.value;

    if (!id) {
      alert("Please select a link");
      return;
    }

    deleteLink({ id });
    setEditMode((editMode) => !editMode);
  };
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
      <Stack spacing={5}>
        <Input ref={idRef} defaultValue={link.id} display="none"></Input>
        <FormControl id="linkTitle">
          <FormLabel>Title</FormLabel>
          {editMode ? (
            <Input type="text" ref={titleRef} />
          ) : (
            <Text textAlign="left">{link.title}</Text>
          )}
        </FormControl>
        <FormControl id="linkURL">
          <FormLabel>URL</FormLabel>
          {editMode ? (
            <Input type="text" ref={urlRef} />
          ) : (
            <Text textAlign="left">{link.url}</Text>
          )}
        </FormControl>
        <Stack spacing={1}>
          {editMode ? (
            <>
              {!add ? (
                <ButtonGroup>
                  <Button
                    onClick={onDelete}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={onSave}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Save
                  </Button>

                  <Button
                    onClick={() => {
                      setEditMode((editMode) => !editMode);
                    }}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup>
                  <Button
                    onClick={onSubmit}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Add
                  </Button>
                </ButtonGroup>
              )}
            </>
          ) : (
            <ButtonGroup>
              <Button
                onClick={() => {
                  setEditMode((editMode) => !editMode);
                }}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Edit
              </Button>
            </ButtonGroup>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
