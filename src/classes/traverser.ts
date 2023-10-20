import DFSA from "./dfsa";

class Traverser {
    dfsa: DFSA
    state: string

    constructor(dfsa: DFSA) {
        this.dfsa = dfsa
        this.state = dfsa.startState
    }

    reset(): void {
        this.state = this.dfsa.startState
    }

    traverse(symbol: string): void {
        const nextState = this.dfsa.transitionFunction.get([this.state, symbol])

        if (nextState === undefined) {
            throw new Error(`No transition from state ${this.state} with symbol ${symbol}`)
        }

        this.state = nextState
    }
}

export default Traverser