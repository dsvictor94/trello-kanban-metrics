import T from '../drivers/Trello';

const Trello = T({key: 'adfca17411f60542fa057dd8af2fb028'});

export const AUTENTICATE_TRELLO = 'AUTENTICATE_TRELLO';
export const AUTENTICATE_TRELLO_SUCCESS = 'AUTENTICATE_TRELLO_SUCCESS';
export const AUTENTICATE_TRELLO_FAILURE = 'AUTENTICATE_TRELLO_FAILURE';

export const UNAUTENTICATE_TRELLO = 'UNAUTENTICATE_TRELLO';

export const autenticate = () => (dispatch, getStore) => {
  dispatch({type: AUTENTICATE_TRELLO});
  const store = getStore();
  Trello
    .authorize({type: 'popup', name: store.app.title})
    .then((token) => {
      dispatch({type: AUTENTICATE_TRELLO_SUCCESS, token});
    })
    .catch(() => dispatch({type: AUTENTICATE_TRELLO_FAILURE}));
};

export const unautenticate = () => (dispatch) => {
  dispatch({type: UNAUTENTICATE_TRELLO});
  Trello.deauthorize();
};
