import Select from 'react-select';

import symbols from './symbols.json';

import styles from './SelectRates.module.css';

import './ReactSelect.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaseCurrency,
  setBaseCurrency,
} from '../../redux/currency/slice';

const SelectRates = () => {
  const currency = useSelector(selectBaseCurrency);
  const dispatch = useDispatch();

  const handleChange = selectedOption => {
    dispatch(setBaseCurrency(selectedOption.value));
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        value={{
          label: currency,
          value: currency,
        }}
        onChange={handleChange}
        classNamePrefix="react-select"
        isSearchable
        options={symbols}
      />
    </div>
  );
};

export default SelectRates;
