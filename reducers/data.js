import {
  FETCH_BOARDS_DATA,
  FETCH_BOARDS_DATA_SUCCESS,
  FETCH_BOARDS_DATA_FAILURE
} from '../actions';

const app = (state = {
  boards: []
}, action) => {
  switch (action.type) {
    case FETCH_BOARDS_DATA:
      return state;
    case FETCH_BOARDS_DATA_SUCCESS:
      return {
        ...state,
        boards: action.boards
      };
    case FETCH_BOARDS_DATA_FAILURE:
      return state;
    default:
      return state;
  }
};

export default app;
