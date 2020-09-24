import {
  DECREMENT,
  INCREMENT,
  REMOVE,
  MAKE_ORDER,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';

const initialState = {
  entities: {}, // { [productId]: amount }
  inProgress: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case INCREMENT:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: (state.entities[payload.id] || 0) + 1,
        },
      };
    case DECREMENT:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: Math.max((state.entities[payload.id] || 0) - 1, 0),
        },
      };
    case REMOVE:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: 0,
        },
      };
    case MAKE_ORDER + REQUEST: {
      return {
        ...state,
        inProgress: true,
      };
    }
    case MAKE_ORDER + SUCCESS: {
      return {
        entities: {},
        inProgress: false,
        error: null,
      };
    }
    case MAKE_ORDER + FAILURE: {
      return {
        entities: {
          ...state.entities,
        },
        inProgress: false,
        error,
      };
    }
    default:
      return state;
  }
};
