/// <reference types="react-scripts" />

interface Currency {
  currencyName: string,
  id: string
}

interface Currencies {
  success: boolean,
  symbols: { [k: string]: string }
}

interface Result {
  result: number,
  success: boolean
}

interface Curr {
  [k: string]: string
}
