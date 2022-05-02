/// <reference types="react-scripts" />

// interface State {
//   currencies: string[];
// }

interface Action {
  type: string,
  payload: any,
}

interface Currencies {
  success: boolean,
  symbols: { [k: string]: string }
}

interface Result {
  date: string,
  historical: string,
  info: {
    rate: number,
    timestamp: number
  },
  query: {
    amount: number,
    from: string,
    to: string
  },
  result: number,
  success: boolean
}
