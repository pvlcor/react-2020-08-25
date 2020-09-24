import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../header';
import Basket from '../basket';
import RestaurantsPage from '../../pages/restaurants-page';
import CheckoutResultPage from '../../pages/checkout-result-page';
import { UserProvider } from '../../contexts/user';
import { CurrencyProvider } from '../../contexts/currency';

const App = () => {
  const [name, setName] = useState('Igor');
  const [currency, setCurrency] = useState('USD');
  const price = (amount) => {
    switch (currency) {
      case 'RUB':
        return `₽ ${(amount * 77.05).toFixed()}`;
      case 'EUR':
        return `€ ${(amount * 0.86).toFixed()}`;
      default:
        return `$ ${amount}`;
    }
  };

  useEffect(() => {
    setInterval(() => {
      // setName(Math.random().toString());
    }, 3000);
  }, []);

  return (
    <div>
      <CurrencyProvider value={{ currency, setCurrency, price }}>
        <UserProvider value={{ name, setName }}>
          <Header />
          <Switch>
            <Route path="/checkout/result" component={CheckoutResultPage} />
            <Route path="/checkout" component={Basket} />
            <Route path="/restaurants" component={RestaurantsPage} />
            <Route path="/error" render={() => <h1>Error Page</h1>} />
            <Redirect from="/" to="/restaurants" />
          </Switch>
        </UserProvider>
      </CurrencyProvider>
    </div>
  );
};

export default App;
