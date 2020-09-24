import { replace, push } from 'connected-react-router';

import {
  INCREMENT,
  DECREMENT,
  REMOVE,
  ADD_REVIEW,
  LOAD_RESTAURANTS,
  LOAD_REVIEWS,
  LOAD_PRODUCTS,
  LOAD_USERS,
  MAKE_ORDER,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './constants';
import {
  usersLoadingSelector,
  usersLoadedSelector,
  reviewsLoadingSelector,
  reviewsLoadedSelector,
  makeOrderInProgressSelector,
  orderProductsListSelector,
} from './selectors';

export const increment = (id) => ({ type: INCREMENT, payload: { id } });
export const decrement = (id) => ({ type: DECREMENT, payload: { id } });
export const remove = (id) => ({ type: REMOVE, payload: { id } });

export const addReview = (review, restaurantId) => ({
  type: ADD_REVIEW,
  payload: { review, restaurantId },
  generateId: ['reviewId', 'userId'],
});

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  CallAPI: '/api/restaurants',
});

export const loadProducts = (restaurantId) => ({
  type: LOAD_PRODUCTS,
  CallAPI: `/api/products?id=${restaurantId}`,
  restaurantId,
});

export const loadReviews = (restaurantId) => async (dispatch, getState) => {
  const state = getState();
  const loading = reviewsLoadingSelector(state, { restaurantId });
  const loaded = reviewsLoadedSelector(state, { restaurantId });

  if (loading || loaded) return;
  dispatch({ type: LOAD_REVIEWS + REQUEST, restaurantId });
  try {
    const response = await fetch(
      `/api/reviews?id=${restaurantId}`
    ).then((res) => res.json());
    dispatch({ type: LOAD_REVIEWS + SUCCESS, response, restaurantId });
  } catch (error) {
    dispatch({ type: LOAD_REVIEWS + FAILURE, error, restaurantId });
    dispatch(replace('/error'));
  }
};

export const loadUsers = (restaurantId) => async (dispatch, getState) => {
  const state = getState();
  const loading = usersLoadingSelector(state);
  const loaded = usersLoadedSelector(state);

  if (loading || loaded) return;

  dispatch({ type: LOAD_USERS, CallAPI: '/api/users' });
};

export const makeOrder = () => async (dispatch, getState) => {
  const state = getState();
  const inProgress = makeOrderInProgressSelector(state);
  const products = orderProductsListSelector(state);
  const requestParams = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(products),
  };

  if (inProgress) return;

  dispatch({ type: MAKE_ORDER + REQUEST });

  try {
    const response = await fetch('/api/order', requestParams).then(
      async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        return data;
      }
    );

    dispatch({ type: MAKE_ORDER + SUCCESS, response });
    dispatch(replace('/checkout/result'));
  } catch (error) {
    dispatch({ type: MAKE_ORDER + FAILURE, error });
    dispatch(push('/checkout/result'));
  }
};
