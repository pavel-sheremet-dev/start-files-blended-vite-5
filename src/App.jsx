import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import Home from './pages/Home';
import Rates from './pages/Rates';
import Layout from './components/Header/Header';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { getBaseCurrency } from './redux/currency/operations';
import { setBaseCurrency } from './redux/currency/slice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = pos => {
      dispatch(getBaseCurrency(pos.coords));
    };

    const error = err => {
      // dispatch(getBaseCurrency(pos.coords));
      dispatch(setBaseCurrency('USD'));
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <>
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      />
      {/* <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes> */}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/rates',
        element: <Rates />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);
