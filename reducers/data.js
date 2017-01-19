import {
  FETCH_BOARDS_SUCCESS,
  FETCH_ACTIONS_SUCCESS
} from '../actions';

const app = (state = {
  boards: [],
  actions: []
}, action) => {
  switch (action.type) {
    case FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        boards: action.boards
      };
    case FETCH_ACTIONS_SUCCESS:
      return {
        ...state,
        actions: action.actions
      };
    default:
      return state;
  }
};

export default app;
