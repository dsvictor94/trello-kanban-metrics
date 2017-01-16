import {
  FETCH_BOARDS_DATA,
  FETCH_BOARDS_DATA_SUCCESS,
  FETCH_BOARDS_DATA_FAILURE,

  FETCH_BOARD_DATA_SUCCESS
} from '../actions';

const app = (state = {
  boards: [],
  actions: []
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
    case FETCH_BOARD_DATA_SUCCESS:
      return {
        ...state,
        actions: action.actions
      };
    default:
      return state;
  }
};

export default app;
