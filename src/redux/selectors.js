import { createSelector } from 'reselect';
import { getAverage, getById, mapToArray } from './utils';

const restaurantsSelector = (state) => state.restaurants.entities;
const productsSelector = (state) => state.products.entities;
const reviewsSelector = (state) => state.reviews.entities;
const usersSelector = (state) => state.users.entities;

const orderSelector = (state) => state.order;

export const restaurantsLoadingSelector = (state) => state.restaurants.loading;
export const restaurantsLoadedSelector = (state) => state.restaurants.loaded;

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

export const restaurantIdSelector = (_, { restaurantId, match }) =>
  restaurantId || match.params.restId;

export const productsLoadingSelector = createSelector(
  restaurantIdSelector,
  (state, _) => state.products.loading,
  (id, productsLoading) => productsLoading[id]
);

export const productsLoadedSelector = createSelector(
  restaurantIdSelector,
  (state, _) => state.products.loaded,
  (id, productsLoaded) => productsLoaded[id]
);

const restaurantSelector = createSelector(
  restaurantIdSelector,
  restaurantsSelector,
  (id, restaurants) => restaurants[id]
);

export const restaurantMenuSelector = createSelector(
  restaurantSelector,
  (restaurant) => restaurant.menu
);

export const restaurantReviewsSelector = createSelector(
  restaurantSelector,
  (restaurant) => restaurant.reviews
);

export const reviewsLoadedSelector = createSelector(
  restaurantIdSelector,
  (state, _) => state.reviews.loaded,
  (id, reviewsLoaded) => reviewsLoaded[id]
);

export const reviewsLoadingSelector = createSelector(
  restaurantIdSelector,
  (state, _) => state.reviews.loading,
  (id, reviewsLoading) => reviewsLoading[id]
);

export const restaurantIdByProductId = createSelector(
  (_, props) => props.product.id,
  restaurantsListSelector,
  (productId, restaurants) =>
    restaurants.find((restaurant) => restaurant.menu.includes(productId))?.id
);
