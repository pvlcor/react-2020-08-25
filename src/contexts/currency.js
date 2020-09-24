import { createContext, useContext } from 'react';

export const currencyContext = createContext({ currency: 'USD' });
export const CurrencyConsumer = currencyContext.Consumer;
export const CurrencyProvider = currencyContext.Provider;

export const currencies = ['USD', 'RUB', 'EUR'];
