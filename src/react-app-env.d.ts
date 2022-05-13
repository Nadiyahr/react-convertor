/// <reference types="react-scripts" />

interface Currency {
  currencyName: string,
  id: string
}

interface Currencies {
  success: boolean,
  currencies: { [k: string]: string }
}

interface Result {
  query: {
    from: string,
    to: string,
    amount: number
  }
  result: number,
  success: boolean
}

interface Curr {
  [k: string]: string
}

interface Switch {
  [k: string]: (value: React.SetStateAction<string>) => void
}
