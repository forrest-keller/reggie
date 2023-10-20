import { Box, Center, Heading, Icon, Stack } from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren } from "react";
import { VscRegex } from "react-icons/vsc";

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Box>
        <Center margin={5}>
          <Stack direction="row" spacing={2} align="center">
            <Icon boxSize={6} as={VscRegex} />
            <Heading fontSize="2xl">reggie</Heading>
          </Stack>
        </Center>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
