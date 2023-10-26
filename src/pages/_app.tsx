import { ChakraProvider } from "@chakra-ui/react";
import { AppType } from "next/app";
import "reactflow/dist/style.css";
import "katex/dist/katex.min.css";

const CustomApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default CustomApp;
