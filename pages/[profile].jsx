import { Stack, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";
import ProfileCard from "../components/profileCard";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ERC725 } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json" assert { type: "json" };
import LinkBox from "../components/link";

const RPC_ENDPOINT = "https://rpc.testnet.lukso.network";
const IPFS_GATEWAY = "https://api.universalprofile.cloud/ipfs";

export default function WithBackgroundImage() {
  const router = useRouter();

  const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
  const config = { ipfsGateway: IPFS_GATEWAY };

  const [profile, setProfile] = useState(null);
  const [invalidProfile, setInvalidProfile] = useState(null);

  useEffect(() => {
    if (router.query.profile) {
      fetchProfile(router.query.profile)
        .then((profileData) => {
          console.log(profileData);
          if (profileData?.value?.LSP3Profile) {
            setProfileData(profileData?.value?.LSP3Profile);
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle the error appropriately
        });
    }
  }, [router]);

  const fetchProfile = async (address) => {
    try {
      const profile = new ERC725(lsp3ProfileSchema, address, provider, config);
      return await profile.fetchData("LSP3Profile");
    } catch (error) {
      console.log(error);
      setInvalidProfile(true);
      return console.log("This is not an ERC725 Contract");
    }
  };

  const setProfileData = (data) => {
    const profileData = {
      links: data.links
        ? data.links.map((link) => ({
            title: link.title,
            id: link.url,
          }))
        : [],
      picture: data.profilePicture ? data.profileImage[0].url : null,
      intro: data.description ? data.description : null,
      name: data.name ? data.name : null,
    };
    setProfile(profileData);
  };

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
          {profile && (
            <ProfileCard
              name={profile.name}
              intro={profile.intro}
              links={profile.links}
              picture={profile.picture}
            />
          )}
          {invalidProfile && <LinkBox title="Universal Profile not found" />}
        </Stack>
      </VStack>
    </Flex>
  );
}
