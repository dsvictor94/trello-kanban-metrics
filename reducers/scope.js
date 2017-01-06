import {
  CHANGE_BOARD,
  CHANGE_BEGINS,
  CHANGE_ENDS
} from '../actions';

const app = (state = {
  board: null,
  begins: null,
  ends: null
}, action) => {
  switch (action.type) {
    case CHANGE_BOARD:
      return {
        ...state,
        board: action.value
      };
    case CHANGE_BEGINS:
      return {
        ...state,
        begins: action.value
      };
    case CHANGE_ENDS:
      return {
        ...state,
        ends: action.value
      };
    default:
      return state;
  }
};

export default app;
