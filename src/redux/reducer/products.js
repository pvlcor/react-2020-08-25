import { FAILURE, LOAD_PRODUCTS, REQUEST, SUCCESS } from '../constants';

const initialState = {
  entities: {},
  loading: false,
  loaded: {},
  error: null,
};

export default (state = initialState, action) => {
  const { restaurantId, type, response, error } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_PRODUCTS + SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [restaurantId]: response,
        },
        loading: false,
        loaded: {
          ...state.loaded,
          [restaurantId]: true,
        },
      };
    case LOAD_PRODUCTS + FAILURE:
      return {
        ...state,
        loading: false,
        error,
      };
    default:
      return state;
  }
};
