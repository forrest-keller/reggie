import DFSA from "./dfsa";

class Traverser {
  dfsa: DFSA;
  state: string;

  constructor(dfsa: DFSA) {
    this.dfsa = dfsa;
    this.state = dfsa.getStartState();
  }

  reset(): void {
    this.state = this.dfsa.getStartState();
  }

  traverse(symbol: string): void {
    const nextState = this.dfsa
      .getTransitionFunction()
      .get([this.state, symbol]);

    if (nextState === undefined) {
      throw new Error(
        `No transition from state ${this.state} with symbol ${symbol}`
      );
    }

    this.state = nextState;
  }
}

export default Traverser;
