
import { createLogic } from 'redux-logic';
import {
  AUTENTICATE_TRELLO,
  AUTENTICATE_TRELLO_SUCCESS,
  AUTENTICATE_TRELLO_FAILURE,

  UNAUTENTICATE_TRELLO,

  FETCH_BOARDS_DATA,
  FETCH_BOARDS_DATA_SUCCESS,
  FETCH_BOARDS_DATA_FAILURE,

  fetchBoardsData
} from '../actions';

export const autenticateLogic = createLogic({
  type: AUTENTICATE_TRELLO,
  cancelType: AUTENTICATE_TRELLO_FAILURE,
  latest: true, // take latest only

  process({ Trello, getState }, dispatch, done) {
    Trello
      .authorize({type: 'popup', name: getState().app.title})
      .then((token) => {
        dispatch({type: AUTENTICATE_TRELLO_SUCCESS, token});
        dispatch(fetchBoardsData());
        done();
      })
      .catch(() => dispatch({type: AUTENTICATE_TRELLO_FAILURE}));
  }
});

export const unautenticateLogic = createLogic({
  type: UNAUTENTICATE_TRELLO,

  process({ Trello }) {
    Trello.deauthorize();
  }
});

export const boardsFetchLogic = createLogic({
  type: FETCH_BOARDS_DATA,
  cancelType: FETCH_BOARDS_DATA_FAILURE,
  latest: true, // take latest only

  process({ Trello, getState }, dispatch) {
    const params = {lists: 'all', list_fields: 'name', fields: 'name,desc'};
    Trello.get('/member/me/boards', params)
      .then((boards) => {
        dispatch({type: FETCH_BOARDS_DATA_SUCCESS, boards});
      })
      .catch((error) => dispatch({type: FETCH_BOARDS_DATA_FAILURE, error}));
  }
});

export default [
  autenticateLogic,
  unautenticateLogic,
  boardsFetchLogic
];
