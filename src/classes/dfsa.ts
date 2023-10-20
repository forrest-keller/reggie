class DFSA {
    states: Set<string>;
    alphabet: Set<string>;
    transitionFunction: Map<[string, string], string>;
    startState: string;
    acceptStates: Set<string>;

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

    addState(state: string): void {
        this.states.add(state);
    }

    removeState(state: string): void {
        this.checkState(state);
        this.states.delete(state);
    }

    addSymbol(symbol: string): void {
        this.alphabet.add(symbol);
    }

    removeSymbol(symbol: string): void {
        this.checkSymbol(symbol);
        this.alphabet.delete(symbol);
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

    setStartState(state: string): void {
        this.checkState(state);
        this.startState = state;
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
