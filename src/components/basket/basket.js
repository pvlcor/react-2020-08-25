import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './basket.module.css';
import './basket.css';
import BasketRow from './basket-row';
import BasketItem from './basket-item';
import Button from '../button';
import Loader from '../loader';
import { makeOrder } from '../../redux/actions';
import {
  orderProductsSelector,
  totalSelector,
  makeOrderInProgressSelector,
} from '../../redux/selectors';
import { UserConsumer } from '../../contexts/user';
import { currencyContext } from '../../contexts/currency';

function Basket({
  title = 'Basket',
  total,
  orderProducts,
  makeOrder,
  makeOrderInProgress,
}) {
  // console.log('render Basket');

  // const { name } = useContext(userContext);

  const { price } = useContext(currencyContext);

  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

  return (
    <div className={styles.basket}>
      {makeOrderInProgress && (
        <div className={styles.overlay}>
          <Loader />
        </div>
      )}
      <h4 className={styles.title}>
        {/* {`${name}'s basket`} */}
        <UserConsumer>{({ name }) => `${name}'s basket`}</UserConsumer>
      </h4>
      <TransitionGroup>
        {orderProducts.map(({ product, amount, subtotal, restaurantId }) => (
          <CSSTransition
            key={product.id}
            timeout={500}
            classNames="basket-item-animation"
          >
            <BasketItem
              product={product}
              amount={amount}
              subtotal={price(subtotal)}
              restaurantId={restaurantId}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <hr className={styles.hr} />
      <BasketRow label="Sub-total" content={price(total)} />
      <BasketRow label="Delivery costs:" content="FREE" />
      <BasketRow label="total" content={price(total)} bold />

      <Switch>
        <Route path="/checkout">
          <Button primary block onClick={makeOrder}>
            order now
          </Button>
        </Route>
        <Route>
          <Link to="/checkout">
            <Button primary block>
              checkout
            </Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    total: totalSelector,
    orderProducts: orderProductsSelector,
    makeOrderInProgress: makeOrderInProgressSelector,
  }),
  { makeOrder }
)(Basket);
