const currencyHttp = 'http://free.currconv.com';
const apiKey = 'dd3f60ee0680556feb45';
// const myHeaders = new Headers();

// myHeaders.append('apikey', 'QcNkBWCbg01lRNKI6H64YumEVU0shxS7');

// const requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
// };

export const getJsonApiArray = (): Promise<Currency[]> => {
  return fetch(`${currencyHttp}/api/v7/currencies?apiKey=${apiKey}`)
    .then(res => res.json())
    .then(result => Object.values(result.results));
};

export const getExchangeRates = (from: string, to: string) => {
  return fetch(`${currencyHttp}/api/v7/convert?q=${from}_${to},${to}_${from}&compact=ultra&apiKey=${apiKey}`)
    .then(res => res.json())
    .then(result => result);
};

// export const arrOfCurrencies = async (): Currency[] => await getJsonApiArray();
