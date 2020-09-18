import React from 'react';
import PropTypes from 'prop-types';
import Product from '../product';
import Loader from '../loader';
import styles from './menu.module.css';
import Basket from '../basket';
import { loadProducts } from '../../redux/actions';
import { connect } from 'react-redux';
import {
  restaurantProductsSelector,
  productsLoadingSelector,
  restaurantProductsLoadedSelector,
} from '../../redux/selectors';

class Menu extends React.Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = { error: null };

  componentDidMount() {
    this.loadProducts();
  }

  componentDidUpdate() {
    this.loadProducts();
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  loadProducts() {
    const { loadProducts, loading, loaded } = this.props;
    if (!loading && !loaded) {
      loadProducts();
    }
  }

  render() {
    const { products, loading, loaded } = this.props;

    if (loading || !loaded) {
      return <Loader />;
    }

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    return (
      <div className={styles.menu}>
        <div>
          {products.map(({ id }) => (
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

// Menu.propTypes = {
//   menu: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired
//   ).isRequired,
// };

export default connect(
  (state, props) => ({
    products: restaurantProductsSelector(state, props) || [],
    loading: productsLoadingSelector(state),
    loaded: restaurantProductsLoadedSelector(state, props),
  }),
  (dispatch, { restaurantId }) => ({
    loadProducts: () => dispatch(loadProducts(restaurantId)),
  })
)(Menu);
