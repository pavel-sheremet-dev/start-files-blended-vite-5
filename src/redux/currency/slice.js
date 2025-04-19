import { createSlice } from '@reduxjs/toolkit';
import { getBaseCurrency, getExchangeInfo, getRates } from './operations';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: false,
    ratesFitler: '',
    rates: [],
  },
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
    changeRatesFilter: (state, { payload }) => {
      state.ratesFitler = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBaseCurrency.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
      })
      .addCase(getExchangeInfo.fulfilled, (state, { payload }) => {
        state.exchangeInfo = payload;
        state.isLoading = false;
      })
      .addCase(getExchangeInfo.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getExchangeInfo.rejected, state => {
        state.isError = true;
        state.isLoading = false;
        state.exchangeInfo = null;
      })
      .addCase(getRates.fulfilled, (state, { payload }) => {
        state.rates = payload;
        state.isLoading = false;
      })
      .addCase(getRates.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getRates.rejected, state => {
        state.isError = true;
        state.isLoading = false;
      });
  },
  selectors: {
    selectBaseCurrency: state => state.baseCurrency,
    selectExchangeInfo: state => state.exchangeInfo,
    selectIsLoading: state => state.isLoading,
    selectIsError: state => state.isError,
    selectRates: state => state.rates,
    selectRatesFilter: state => state.ratesFitler,
  },
});

export const {
  selectBaseCurrency,
  selectExchangeInfo,
  selectIsError,
  selectIsLoading,
  selectRates,
  selectRatesFilter,
} = currencySlice.selectors;

export const { setBaseCurrency, changeRatesFilter } = currencySlice.actions;
