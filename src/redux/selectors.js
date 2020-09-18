import { createSelector } from 'reselect';
import { getAverage, getById, mapToArray, arrToMap } from './utils';

const restaurantsSelector = (state) => state.restaurants.entities;
const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products.entities;
const reviewsSelector = (state) => state.reviews.entities;
const usersSelector = (state) => state.users.entities;

export const restaurantsLoadingSelector = (state) => state.restaurants.loading;
export const restaurantsLoadedSelector = (state) => state.restaurants.loaded;
export const productsLoadingSelector = (state) => state.products.loading;
export const productsLoadedSelector = (state) => state.products.loaded;
export const reviewsLoadedSelector = (state) => state.reviews.loaded;
export const reviewsLoadingSelector = (state) => state.reviews.loading;
export const usersLoadingSelector = (state) => state.users.loading;
export const usersLoadedSelector = (state) => state.users.loaded;

export const restaurantsListSelector = mapToArray(restaurantsSelector);
export const reviewsListSelector = createSelector(
  reviewsSelector,
  (_, { restaurantId }) => restaurantId,
  (reviews, restaurantId) => Object.values(reviews[restaurantId] || {})
);
export const productAmountSelector = getById(orderSelector, 0);
export const productsMapSelector = createSelector(
  productsSelector,
  (products) => arrToMap(Object.values(products).flatMap((arr) => arr))
);
export const productSelector = getById(productsMapSelector);
export const restaurantProductsLoadedSelector = createSelector(
  productsLoadedSelector,
  (_, { restaurantId, id }) => id || restaurantId,
  (loaded, restaurantId) => loaded[restaurantId]
);
export const restaurantReviewsLoadedSelector = createSelector(
  reviewsLoadedSelector,
  (_, { restaurantId }) => restaurantId,
  (loaded, restaurantId) => loaded[restaurantId]
);
export const restaurantProductsSelector = createSelector(
  productsSelector,
  (_, { restaurantId }) => restaurantId,
  (products, restaurantId) => products[restaurantId]
);

const reviewSelector = createSelector(
  reviewsSelector,
  (_, props) => props,
  (reviews, { restaurantId, id }) => reviews[restaurantId][id]
);
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
    const ratings = ids.map((id) => reviews[id]?.rating);
    return Math.round(getAverage(ratings));
  }
);

export const orderProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  (products, order) => {
    return Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
      }));
  }
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);
