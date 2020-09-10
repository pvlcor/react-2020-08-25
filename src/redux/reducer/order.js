import { DECREMENT, INCREMENT, REMOVE } from '../constants';

// { [productId]: amount }
export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [payload.id]: (state[payload.id] || 0) + 1 };
    case DECREMENT:
      const i = (state[payload.id] || 0) - 1;
      return { ...state, [payload.id]: i < 0 ? 0 : i };
    case REMOVE:
      const { [payload.id]: removed, ...rest } = state;
      return { ...rest };
    default:
      return state;
  }
};
