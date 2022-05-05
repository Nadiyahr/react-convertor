/// <reference types="react-scripts" />

interface Currency {
  currencyName: string,
  currencySymbol: string,
  id: string
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

interface Curr {
  [k: string]: number
}
