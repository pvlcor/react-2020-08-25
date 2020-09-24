import { createSelector } from 'reselect';
import { getAverage, getById, mapToArray } from './utils';

const restaurantsSelector = (state) => state.restaurants.entities;
const productsSelector = (state) => state.products.entities;
const reviewsSelector = (state) => state.reviews.entities;
const usersSelector = (state) => state.users.entities;

const orderSelector = (state) => state.order.entities;

export const restaurantsLoadingSelector = (state) => state.restaurants.loading;
export const restaurantsLoadedSelector = (state) => state.restaurants.loaded;

export const productsLoadingSelector = (state, props) =>
  state.products.loading[props.restaurantId];
export const productsLoadedSelector = (state, props) =>
  state.products.loaded[props.restaurantId];

export const reviewsLoadingSelector = (state, props) =>
  state.reviews.loading[props.restaurantId];
export const reviewsLoadedSelector = (state, props) =>
  state.reviews.loaded[props.restaurantId];

export const usersLoadingSelector = (state) => state.users.loading;
export const usersLoadedSelector = (state) => state.users.loaded;

export const restaurantsListSelector = mapToArray(restaurantsSelector);
export const productAmountSelector = getById(orderSelector);
export const productSelector = getById(productsSelector);
const reviewSelector = getById(reviewsSelector);

export const reviewWitUserSelector = createSelector(
  reviewSelector,
  usersSelector,
  (review, users) => ({
    ...review,
    user: users[review.userId]?.name,
  })
);

export const averageRatingSelector = createSelector(
  reviewsSelector,
  (_, { reviews }) => reviews,
  (reviews, ids) => {
    const ratings = ids.map((id) => reviews[id]?.rating || 0);
    return Math.round(getAverage(ratings));
  }
);

const restaurantsIdsByProductsSelector = createSelector(
  restaurantsListSelector,
  (restaurants) =>
    restaurants
      .flatMap((rest) =>
        rest.menu.map((productId) => ({ productId, restId: rest.id }))
      )
      .reduce(
        (acc, { productId, restId }) => ({ ...acc, [productId]: restId }),
        {}
      )
);

export const orderProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  restaurantsIdsByProductsSelector,
  (products, order, restaurantsIds) => {
    return Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
        restaurantId: restaurantsIds[product.id],
      }));
  }
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);

export const makeOrderInProgressSelector = (state) => state.order.inProgress;
export const orderProductsListSelector = createSelector(
  orderSelector,
  (order) => Object.entries(order).map(([id, amount]) => ({ id, amount }))
);

export const makeOrderErrorSelector = (state) => state.order.error;
