import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";

export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    {
      id: 42,
      name: "LUKSO Mainnet",
      network: "42",
      blockExplorers: {
        default: {
          name: "Execution Exporer",
          url: "https://explorer.execution.mainnet.lukso.network",
        },
      },
      nativeCurrency: { name: "LYX", symbol: "LYX", decimals: 18 },
      rpcUrls: {
        42: {
          http: ["https://rpc.mainnet.lukso.network"],
          webSocket: ["wss://ws-rpc.mainnet.lukso.network"],
        },
        default: {
          http: ["https://rpc.mainnet.lukso.network"],
          webSocket: ["wss://ws-rpc.mainnet.lukso.network"],
        },
        public: {
          http: ["https://rpc.mainnet.lukso.network"],
          webSocket: ["wss://ws-rpc.mainnet.lukso.network"],
        },
      },
    },
    {
      id: 4201,
      name: "LUKSO Testnet",
      network: "4201",
      blockExplorers: {
        default: {
          name: "Execution Exporer",
          url: "https://explorer.execution.testnet.lukso.network",
        },
      },
      nativeCurrency: { name: "TEST LYX", symbol: "LYXt", decimals: 18 },
      rpcUrls: {
        4201: {
          http: ["https://rpc.testnet.lukso.network"],
          webSocket: ["wss://ws-rpc.testnet.lukso.network"],
        },
        default: {
          http: ["https://rpc.testnet.lukso.network"],
          webSocket: ["wss://ws-rpc.testnet.lukso.network"],
        },
        public: {
          http: ["https://rpc.testnet.lukso.network"],
          webSocket: ["wss://ws-rpc.testnet.lukso.network"],
        },
      },
      testnet: true,
    },
  ],
  [w3mProvider({ projectId: walletConnectProjectId })]
);

export const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 2,
  }),
  publicClient,
  webSocketPublicClient,
});

export { chains, publicClient };
