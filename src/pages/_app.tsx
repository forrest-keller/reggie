import Layout from "@/components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { AppType } from "next/app";

const CustomApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default CustomApp;
