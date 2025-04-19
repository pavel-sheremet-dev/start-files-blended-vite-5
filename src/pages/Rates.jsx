import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRates } from '../redux/currency/operations';
import { selectFilteredRates } from '../redux/currency/selectors';
import RatesList from '../components/RatesList/RatesList';
import { selectBaseCurrency } from '../redux/currency/slice';
import Filter from '../components/Filter/Filter';

const Rates = () => {
  const isError = false;

  const rates = useSelector(selectFilteredRates);
  const baseCurrency = useSelector(selectBaseCurrency);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRates());
  }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        <Filter />
        {rates.length > 0 && <RatesList rates={rates} />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
