import DFSAFlowchart from "@/components/dfsa-flowchart";
import useDfsa from "@/hooks/use-dfsa";
import { Box, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";

type Transition = [[string, string], string];

const transitions: Transition[] = [
  [["q_0", "0"], "q_0"],
  [["q_0", "1"], "q_1"],
  [["q_1", "0"], "q_0"],
  [["q_1", "1"], "q_2"],
  [["q_1", "0"], "q_2"],
  [["q_2", "0"], "q_1"],
];

const json = {
  states: ["q_0", "q_1", "q_2"],
  alphabet: ["1", "0"],
  transitions,
  startState: "q_0",
  acceptStates: ["q_1"],
};

const HomePage: NextPage = () => {
  const dfsa = useDfsa(json);

  return (
    <Box width="100vw" height="100vh">
      <DFSAFlowchart dfsa={dfsa} />
    </Box>
  );
};

export default HomePage;
