import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: 'yrca7AuB5nfrGPxo3CB8cP0SrWVQuc8j' },
});

export const exchangeCurrency = async request => {
  const {
    data: { query, info, result },
  } = await instance.get(`/convert`, {
    params: request,
  });
  return { ...query, rate: info.rate, result };
};

export const latestRates = async baseCurrency => {
  const { data } = await instance.get(`/latest?symbols&base=${baseCurrency}`);
  console.log('data', data);
  return Object.entries(data.rates);
};
