import {
  ADD_REVIEW,
  LOAD_REVIEWS,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: {},
  error: null,
};

export default (state = initialState, action) => {
  const {
    type,
    payload,
    reviewId,
    userId,
    response,
    error,
    restaurantId,
  } = action;

  switch (type) {
    case LOAD_REVIEWS + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_REVIEWS + SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [restaurantId]: arrToMap(response),
        },
        loading: false,
        loaded: {
          ...state.loaded,
          [restaurantId]: true,
        },
      };
    case LOAD_REVIEWS + FAILURE:
      return {
        ...state,
        loading: false,
        error,
      };
    case ADD_REVIEW:
      const { text, rating } = payload.review;
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.restaurantId]: {
            ...state.entities[payload.restaurantId],
            [reviewId]: { id: reviewId, userId, text, rating },
          },
        },
      };
    default:
      return state;
  }
};
