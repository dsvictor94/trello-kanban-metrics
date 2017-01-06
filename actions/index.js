import T from '../drivers/Trello';

const Trello = T({key: 'adfca17411f60542fa057dd8af2fb028'});

export const AUTENTICATE_TRELLO = 'AUTENTICATE_TRELLO';
export const AUTENTICATE_TRELLO_SUCCESS = 'AUTENTICATE_TRELLO_SUCCESS';
export const AUTENTICATE_TRELLO_FAILURE = 'AUTENTICATE_TRELLO_FAILURE';

export const UNAUTENTICATE_TRELLO = 'UNAUTENTICATE_TRELLO';

export const FETCH_BOARDS_DATA = 'FETCH_BOARDS_DATA';
export const FETCH_BOARDS_DATA_SUCCESS = 'FETCH_BOARDS_DATA_SUCCESS';
export const FETCH_BOARDS_DATA_FAILURE = 'FETCH_BOARDS_DATA_FAILURE';

export const CHANGE_BOARD = 'CHANGE_BOARD';
export const CHANGE_BEGINS = 'CHANGE_BEGINS';
export const CHANGE_ENDS = 'CHANGE_ENDS';

export const autenticate = () => (dispatch, getStore) => {
  dispatch({type: AUTENTICATE_TRELLO});
  const store = getStore();
  Trello
    .authorize({type: 'popup', name: store.app.title})
    .then((token) => {
      dispatch({type: AUTENTICATE_TRELLO_SUCCESS, token});
      dispatch(fetchBoardsData());
    })
    .catch(() => dispatch({type: AUTENTICATE_TRELLO_FAILURE}));
};

export const unautenticate = () => (dispatch) => {
  dispatch({type: UNAUTENTICATE_TRELLO});
  Trello.deauthorize();
};

export const fetchBoardsData = () => (dispatch) => {
  dispatch({type: FETCH_BOARDS_DATA});
  Trello.get('/member/me/boards', {lists: 'all', list_fields: 'name', fields: 'name,desc'})
    .then((boards) => {
      dispatch({type: FETCH_BOARDS_DATA_SUCCESS, boards});
    })
    .catch((error) => dispatch({type: FETCH_BOARDS_DATA_FAILURE, error}));
};

export const changeBoard = (value) => ({
  type: CHANGE_BOARD,
  value: value
});

export const changeBegins = (value) => ({
  type: CHANGE_BEGINS,
  value: value
});

export const changeEnds = (value) => ({
  type: CHANGE_ENDS,
  value: value
});
