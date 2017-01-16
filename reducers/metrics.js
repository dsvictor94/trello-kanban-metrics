import {
  UPDATE_THROUGHPUT
} from '../actions';

const app = (state = {
  throughput: NaN
}, action) => {
  switch (action.type) {
    case UPDATE_THROUGHPUT:
      return {
        ...state,
        throughput: action.throughput
      };
    default:
      return state;
  }
};

export default app;
