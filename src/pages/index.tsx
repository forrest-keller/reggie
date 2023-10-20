import DFSAFlowchart from "@/components/dfsa-flowchart";
import useDfsa from "@/hooks/use-dfsa";
import { Box, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";

type Transition = [[string, string], string];

const transitions: Transition[] = [
  [["q_0", "0"], "q_0"],
  [["q_0", "1"], "q_1"],
  [["q_1", "0"], "q_0"],
  [["q_1", "1"], "q_1"],
];

const json = {
  states: ["q_0", "q_1"],
  alphabet: ["1", "0"],
  transitions,
  startState: "q_0",
  acceptStates: ["q_1"],
};

const HomePage: NextPage = () => {
  const dfsa = useDfsa(json);

  return (
    <Stack height="80%" width="100%" direction="row" spacing={2}>
      <Stack width="20vw">
        <Box backgroundColor="blackAlpha.100">
          <Text>Editing</Text>
        </Box>
        <Box backgroundColor="blackAlpha.100">
          <Text>Running</Text>
        </Box>
      </Stack>
      <Box width="100%">
        <DFSAFlowchart dfsa={dfsa} />
      </Box>
    </Stack>
  );
};

export default HomePage;
