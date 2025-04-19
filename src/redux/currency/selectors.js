import { createSelector } from '@reduxjs/toolkit';
import { selectBaseCurrency, selectRates, selectRatesFilter } from './slice';

export const selectFilteredRates = createSelector(
  [selectRates, selectBaseCurrency, selectRatesFilter],
  (rates, baseCurrency, filter) => {
    return rates
      .filter(
        ([key]) =>
          key !== baseCurrency &&
          key.toLowerCase().includes(filter.toLowerCase()),
      )
      .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  },
);
