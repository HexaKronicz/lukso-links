import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalProvider } from "../contexts/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ChakraProvider>
  );
}

export default MyApp;
