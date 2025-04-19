import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency, latestRates } from '../../service/exchangeAPI';

export const getBaseCurrency2 = createAsyncThunk(
  'currency/getBaseCurrency',
  async (crd, thunkApi) => {
    const { baseCurrency } = thunkApi.getState().currency;
    if (baseCurrency) {
      return thunkApi.fulfillWithValue(baseCurrency);
    }

    try {
      const userInfo = await getUserInfo(crd);

      return userInfo.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkApi.rejectWithValue('Something went wrong');
    }
  },
);

export const getBaseCurrency = createAsyncThunk(
  'currency/getBaseCurrency',
  async (crd, thunkApi) => {
    try {
      const userInfo = await getUserInfo(crd);

      return userInfo.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkApi.rejectWithValue('Something went wrong');
    }
  },
  {
    condition: (_, thunkApi) =>
      Boolean(!thunkApi.getState().currency.baseCurrency),
  },
);

export const getExchangeInfo = createAsyncThunk(
  'currency/getExchangeInfo',
  async (request, thunkApi) => {
    try {
      const exchangeInfo = await exchangeCurrency(request);
      // return {
      //   to: 'UAH',
      //   from: 'USD',
      //   amount: 15,
      //   rate: 37.5,
      //   result: 562.5,
      // };
      return exchangeInfo;
    } catch (error) {
      return thunkApi.rejectWithValue('Something went wrong');
    }
  },
);

export const getRates = createAsyncThunk(
  'currency/getRates',
  async (_, thunkApi) => {
    const { baseCurrency } = thunkApi.getState().currency;
    try {
      const rates = await latestRates(baseCurrency);
      return rates;
    } catch (error) {
      return thunkApi.rejectWithValue('Something went wrong');
    }
  },
);
