import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Link,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState, useContext, useRef } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Textarea } from "@chakra-ui/react";
import ProfileCard from "./profileCard";
import AddLinkCard from "./addLinkCard";
import ipfsNode from "../utils/ipfs-node";

export default function CreateComponent() {
  const { setAccount, account, LSP7Contract } = useContext(GlobalContext);
  const [links, setLinks] = useState([]);
  const [profileDetails, setProfileDetails] = useState();
  const [profileName, setProfileName] = useState();
  const [profilePicture, setProfilePicture] = useState(
    "https://i.imgur.com/5QI9Ury.jpeg"
  );
  const [profilePictureView, setProfilePictureView] = useState();
  const [profileIntro, setProfileIntro] = useState();

  const addProfileDetails = async () => {
    setProfileDetails({
      name: profileName,
      picure: profilePicture,
      intro: profileIntro,
    });
  };

  const addLink = async (data) => {
    const id = links.length + 1;
    setLinks([...links, { id: id, title: data.title, url: data.url }]);
  };

  const updateLink = async (data) => {
    setLinks(
      links.map((link) =>
        link.id == data.id
          ? { id: data.id, title: data.title, url: data.url }
          : link
      )
    );
    console.log(links);
  };

  const deleteLink = async (data) => {
    setLinks(links.filter((link) => link.id !== data.id));
  };

  const publish = async () => {
    let cid;
    const data = { profile: profileDetails, links: links };
    try {
      const ipfs = ipfsNode();
      const postJson = JSON.stringify(data);
      const ipfsResult = await ipfs.add({ content: postJson, pin: true });
      cid = ipfsResult.cid.toString();
      console.log(cid);
    } catch (error) {
      console.log(error);
    }
    try {
      if (cid) {
        const tx = await LSP7Contract.methods
          .createLink(cid)
          .send({ from: account });

        if (tx.status) {
          console.log(authorAttrs, "authorAttrs");
        }
      }
    } catch (err) {
      if (err.code == 4001) {
        console.log("User rejected transaction");
        return;
      }
      console.log(err, "err");
    }
  };

  // IF the user clicks the LOGIN BUTTON
  async function loginExtension() {
    if (!window.ethereum) {
      alert("Please connect to Universal Profile Extension or MetaMask");
      return;
    }

    try {
      // request access to the extension
      await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })

        .then(function (accounts) {
          // check if any number of accounts was returned
          // IF go to the dashboard
          if (accounts.length) {
            router.push("/create");
            setAccount(accounts[0]);
          } else {
            console.log("User denied access");
          }
        });
    } catch (error) {
      if (error.message === "User denied access") {
        console.log("User denied access");
      } else {
        console.log(error);
      }
    }
  }
  return (
    <Container maxW={"7xl"}>
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={2} spacing={{ base: 5, md: 10 }}>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Tabs variant="soft-rounded" colorScheme={"red"} w={"full"}>
              <TabList mb="1em">
                <Tab color={"white"}>Profile Details</Tab>
                <Tab color={"white"}>Links</Tab>
                <Tab color={"white"}>Publish</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box
                    maxW={"520px"}
                    w={"full"}
                    bg={useColorModeValue("white", "gray.900")}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    p={6}
                    textAlign={"center"}
                  >
                    <Stack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setProfileName(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormControl id="picture">
                        <FormLabel>Profile picture</FormLabel>
                        <Input
                          type="file"
                          onChange={(e) => setProfilePicture(e.target.value)}
                        />
                      </FormControl>
                      <FormControl id="description">
                        <FormLabel>Intro</FormLabel>
                        <Textarea
                          onChange={(e) => setProfileIntro(e.target.value)}
                        />
                      </FormControl>
                      <Stack spacing={1}>
                        <Button
                          onClick={addProfileDetails}
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                        >
                          Save profile
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <AddLinkCard
                    edit={true}
                    link={links}
                    add={true}
                    addLink={addLink}
                  />
                  {links.map((l) => (
                    <AddLinkCard
                      link={l}
                      key={l.id}
                      updateLink={updateLink}
                      deleteLink={deleteLink}
                    />
                  ))}
                </TabPanel>
                <TabPanel>
                  <Box
                    maxW={"520px"}
                    w={"full"}
                    bg={useColorModeValue("white", "gray.900")}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    p={6}
                    textAlign={"center"}
                  >
                    <Stack spacing={5}>
                      <Stack spacing={1}>
                        <Button
                          onClick={publish}
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                        >
                          Publish profile
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>

            {/* <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              Add Link
            </Button> */}
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"start"}
          position={"relative"}
          w={"full"}
        >
          <ProfileCard
            links={links}
            name={profileName}
            intro={profileIntro}
            picture={profilePictureView}
          />
        </Flex>
      </Stack>
    </Container>
  );
}

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

export const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
