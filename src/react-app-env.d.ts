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

interface ExchangeratesData {
  base: string,
  date: string,
  historical: boolean,
  rates: Curr,
  success: boolean
}

// base: "UAH"
// date: "2022-05-08"
// rates:
// BGN: 0.061271
// CZK: 0.784386
// HRK: 0.236161
// HUF: 11.973205
// PLN: 0.1478
// RON: 0.155125
// SEK: 0.328991
// USD: 0.033061
// // [[Prototype]]: Object
// success: true
// timestamp: 1652011684
// // [[Prototype]]: Object
