import {
  AUTENTICATE_TRELLO,
  AUTENTICATE_TRELLO_SUCCESS,
  AUTENTICATE_TRELLO_FAILURE,
  UNAUTENTICATE_TRELLO,

  FETCH_BOARDS,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,

  FETCH_ACTIONS,
  FETCH_ACTIONS_SUCCESS,
  FETCH_ACTIONS_FAILURE
} from '../actions';

const app = (state = {
  title: 'Trello Kanban Metrics',
  token: null,
  autenticated: false,
  fething: true
}, action) => {
  switch (action.type) {
    case AUTENTICATE_TRELLO:
      return {
        ...state,
        fething: true
      };
    case AUTENTICATE_TRELLO_SUCCESS:
      return {
        ...state,
        fething: false,
        autenticated: true,
        token: action.token
      };
    case AUTENTICATE_TRELLO_FAILURE:
      return {
        ...state,
        fething: false,
        autenticated: false,
        token: null
      };
    case UNAUTENTICATE_TRELLO:
      return {
        ...state,
        autenticated: false,
        token: null
      };
    case FETCH_BOARDS:
    case FETCH_ACTIONS:
      return {...state, fething: true};
    case FETCH_BOARDS_SUCCESS:
    case FETCH_BOARDS_FAILURE:
    case FETCH_ACTIONS_SUCCESS:
    case FETCH_ACTIONS_FAILURE:
      return {...state, fething: false};
    default:
      return state;
  }
};

export default app;
