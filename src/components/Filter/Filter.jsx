import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import {
  changeRatesFilter,
  selectRatesFilter,
} from '../../redux/currency/slice';

const Filter = () => {
  const filter = useSelector(selectRatesFilter);
  const dispatch = useDispatch();
  return (
    <input
      value={filter}
      onChange={e => dispatch(changeRatesFilter(e.target.value))}
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
    />
  );
};

export default Filter;
