class DFSA {
  private states: Set<string>;
  private alphabet: Set<string>;
  private transitionFunction: Map<[string, string], string>;
  private startState: string;
  private acceptStates: Set<string>;

  constructor(states: Set<string>, alphabet: Set<string>, startState: string) {
    this.states = states;
    this.alphabet = alphabet;
    this.transitionFunction = new Map();
    this.checkState(startState);
    this.startState = startState;
    this.acceptStates = new Set();
  }

  private checkState(state: string): void {
    if (!this.states.has(state)) {
      throw new Error(`State ${state} not in states`);
    }
  }

  private checkSymbol(symbol: string): void {
    if (!this.alphabet.has(symbol)) {
      throw new Error(`Symbol ${symbol} not in alphabet`);
    }
  }

  getStates(): Set<string> {
    return this.states;
  }

  addState(state: string): void {
    this.states.add(state);
  }

  removeState(state: string): void {
    this.checkState(state);
    this.states.delete(state);
  }

  getAlphabet(): Set<string> {
    return this.alphabet;
  }

  addSymbol(symbol: string): void {
    this.alphabet.add(symbol);
  }

  removeSymbol(symbol: string): void {
    this.checkSymbol(symbol);
    this.alphabet.delete(symbol);
  }

  getTransitionFunction(): Map<[string, string], string> {
    return this.transitionFunction;
  }

  addTransition(from: string, symbol: string, to: string): void {
    this.checkState(from);
    this.checkSymbol(symbol);
    this.checkState(to);
    this.transitionFunction.set([from, symbol], to);
  }

  removeTransition(from: string, symbol: string): void {
    this.checkState(from);
    this.checkSymbol(symbol);
    this.transitionFunction.delete([from, symbol]);
  }

  getStartState(): string {
    return this.startState;
  }

  setStartState(state: string): void {
    this.checkState(state);
    this.startState = state;
  }

  getAcceptStates(): Set<string> {
    return this.acceptStates;
  }

  addAcceptState(state: string): void {
    this.checkState(state);
    this.acceptStates.add(state);
  }

  removeAcceptState(state: string): void {
    this.checkState(state);
    this.acceptStates.delete(state);
  }
}

export default DFSA;
