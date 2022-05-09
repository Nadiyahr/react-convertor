// export const BASE_URL = 'https://api.apilayer.com/fixer';
export const BASE_URL = 'https://api.apilayer.com/exchangerates_data';
const myHeaders = new Headers();

//myHeaders.append('apikey'', 'QcNkBWCbg01lRNKI6H64YumEVU0shxS7');
myHeaders.append('apikey', 'VrLd2rRsJm6EN0BsvafaQkLbWvU2jl91');

export const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
