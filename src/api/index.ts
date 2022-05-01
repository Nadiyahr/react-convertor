// const currencyHttp = 'http://free.currconv.com';
// const exchange = 'https://api.exchangerate.host/latest';
// const apiKey = 'dd3f60ee0680556feb45';
// const apiKey ='QcNkBWCbg01lRNKI6H64YumEVU0shxS7';
const myHeaders = new Headers();

myHeaders.append('apikey', 'QcNkBWCbg01lRNKI6H64YumEVU0shxS7');

const requestOptions = {
  method: 'GET',
  // redirect: 'follow',
  headers: myHeaders,
};

export const getJsonApi = () => {
  return fetch('https://api.apilayer.com/fixer/symbols', requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result));
  // .catch(error => console.log('error', error));
};

export const getExchangeRates = (amount: string, from: string, to: string) => {
  return fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result));
};
