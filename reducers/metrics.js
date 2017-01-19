import {
  UPDATE_THROUGHPUT,
  UPDATE_LEAD_TIME
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
    case UPDATE_LEAD_TIME:
      return {
        ...state,
        leadTime: action.leadTime
      };
    default:
      return state;
  }
};

export default app;
