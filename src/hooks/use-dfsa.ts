import DFSA from "@/classes/dfsa";
import { useEffect, useState } from "react";
import { z } from "zod";

const transitionSchema = z.tuple([
  z.tuple([z.string(), z.string()]),
  z.string(),
]);

const dfsaDataSchema = z.object({
  states: z.array(z.string()),
  alphabet: z.array(z.string()),
  transitions: z.array(transitionSchema),
  startState: z.string(),
  acceptStates: z.array(z.string()),
});

type DFSAData = z.infer<typeof dfsaDataSchema>;

const parseDfsa = (dfsaData: object): DFSA => {
  const parsedDfsa = dfsaDataSchema.parse(dfsaData);
  const dfsa = new DFSA(
    new Set(parsedDfsa.states),
    new Set(parsedDfsa.alphabet),
    parsedDfsa.startState
  );

  parsedDfsa.transitions.forEach(([[from, symbol], to]) => {
    dfsa.addTransition(from, symbol, to);
  });

  parsedDfsa.acceptStates.forEach((state) => {
    dfsa.addAcceptState(state);
  });

  return dfsa;
};

const useDfsa = (dfsaData: DFSAData) => {
  const [dfsa, setDfsa] = useState<DFSA>(parseDfsa(dfsaData));

  useEffect(() => {
    setDfsa(parseDfsa(dfsaData));
  }, [dfsaData]);

  return dfsa;
};

export default useDfsa;
