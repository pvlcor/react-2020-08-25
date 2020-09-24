import React, { useContext } from 'react';

import Logo from './logo';
import styles from './header.module.css';
import { userContext } from '../../contexts/user';
import { currencyContext, currencies } from '../../contexts/currency';

const Header = () => {
  const { name, setName } = useContext(userContext);
  const { setCurrency } = useContext(currencyContext);

  return (
    <header className={styles.header} onClick={() => setName('Ivan')}>
      <Logo />
      <h2>{name}</h2>
      <div className={styles.currencies}>
        {currencies.map((str, index) => (
          <span
            className={styles.currency}
            key={index}
            onClick={() => setCurrency(str)}
          >
            {str}
          </span>
        ))}
      </div>
    </header>
  );
};
export default Header;
