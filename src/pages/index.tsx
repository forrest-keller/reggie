import useDfsa from "@/hooks/use-dfsa";
import { readFile, readFileSync } from "fs";
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

  console.log("DFSA", dfsa);

  return <div>Home</div>;
};

export default HomePage;
