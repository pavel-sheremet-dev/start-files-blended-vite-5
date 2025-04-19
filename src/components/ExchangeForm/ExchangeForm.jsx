import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { getExchangeInfo } from '../../redux/currency/operations';

const regexpPattern = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

const ExchangeForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const request = event.target.elements.request.value.trim();

    const isValid = regexpPattern.test(request);

    if (!isValid) return;

    const [amount, from, , to] = request.split(' ');
    const requestObj = { to, from, amount };

    dispatch(getExchangeInfo(requestObj));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        title="Request format 15 USD in UAH"
        name="request"
        className={styles.input}
      />
    </form>
  );
};

export default ExchangeForm;
