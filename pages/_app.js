import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalProvider from "../contexts/GlobalContext";
import { config, chains, walletConnectProjectId } from "../utils/wagmi";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";
import { EthereumClient } from "@web3modal/ethereum";

const ethereumClient = new EthereumClient(config, chains);

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
      />
      <ChakraProvider>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
