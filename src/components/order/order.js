import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { increment, decrement, remove } from '../../redux/actions';
import { connect } from 'react-redux';

const Order = ({ restaurants, order, increment, decrement, remove }) => {
  const currentOrder = useMemo(
    () =>
      restaurants
        .flatMap(({ menu }) => menu)
        .filter((product) => Object.keys(order).includes(product.id))
        .map((product) => ({ ...product, amount: order[product.id] })),
    [restaurants, order]
  );

  return (
    <div>
      {currentOrder.length === 0 && <div>Блюда не выбраны</div>}
      {currentOrder.map(({ name, id, price, amount }) => (
        <div key={id}>
          <span>{name}: </span>
          <span>{amount} </span>
          <span>
            <button onClick={() => (amount ? decrement(id) : remove(id))}>
              <b>-</b>
            </button>
            <button onClick={() => increment(id)}>
              <b>+</b>
            </button>
            <button onClick={() => remove(id)}>
              <b>x</b>
            </button>
          </span>
          <span> ${price * amount}</span>
        </div>
      ))}
      <div>
        Итого: $
        {currentOrder.reduce(
          (acc, { amount, price }) => acc + amount * price,
          0
        )}
      </div>
    </div>
  );
};

Order.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      menu: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
  order: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  remove: PropTypes.func,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {
  increment,
  decrement,
  remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
