import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadProducts } from '../../redux/actions';
import {
  productsLoadingSelector,
  productsLoadedSelector,
  restaurantMenuSelector,
  restaurantIdSelector,
} from '../../redux/selectors';

import Loader from '../loader';
import Product from '../product';

import styles from './menu.module.css';
import Basket from '../basket';

class Menu extends React.Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = { error: null };

  loadProductsIfNeeded = () => {
    const { loadProducts, restaurantId, loading, loaded } = this.props;
    if (!loading && !loaded) {
      loadProducts(restaurantId);
    }
  };

  componentDidMount() {
    this.loadProductsIfNeeded();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.restaurantId !== this.props.restaurantId) {
      this.loadProductsIfNeeded();
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { menu = [], loading } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    return (
      <div className={styles.menu}>
        <div>
          {menu.map((id) => (
            <Product key={id} id={id} />
          ))}
        </div>
        <div>
          <Basket />
        </div>
      </div>
    );
  }
}

export default connect(
  createStructuredSelector({
    loading: productsLoadingSelector,
    loaded: productsLoadedSelector,
    menu: restaurantMenuSelector,
    restaurantId: restaurantIdSelector,
  }),
  { loadProducts }
)(Menu);
