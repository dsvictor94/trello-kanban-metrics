// fetch all cards which belong to the board
// fetch all actions for each card
// filter actions that contain information about when the card has been moving to a list
//
//
// Calculate the time spent in each card
// StartDate: Date the card has been moved to "Em Desenvolvimento" (work begins)
// EndDate: Date the card has been moved to "Pronto para homologar" (work ends)
// Days spent = EndDate - StartDate
//
//
import T from '../drivers/Trello';

const Trello = T({key: 'adfca17411f60542fa057dd8af2fb028'});
export const FETCH_BOARD_CARDS = 'FETCH_BOARD_CARDS';
export const FETCH_BOARD_CARDS_SUCCESS = 'FETCH_BOARD_CARDS_SUCCESS';
export const FETCH_BOARD_CARDS_FAILURE = 'FETCH_BOARD_CARDS_FAILURE';

export const FETCH_CARD_ACTIONS = 'FETCH_BOARD_CARDS';
export const FETCH_CARD_ACTIONS_SUCCESS = 'FETCH_BOARD_CARDS_SUCCESS';
export const FETCH_CARD_ACTIONS_FAILURE = 'FETCH_BOARD_CARDS_FAILURE';

// {
//   "id": "4eea503791e31d1746000080",
//   "name": "Finish my awesome application",
//   "idList": "4eea4ffc91e31d174600004a",
//   "url": "https://trello.com/c/XlG8S7ll/3-finish-my-awesome-application"
// }
export const fetchBoardCards = (boardId) => (dispatch) => {
  dispatch({ type: FETCH_BOARD_CARDS });
  Trello.get(`boards/${boardId}/cards`)
    .then((cards) => {
      dispatch({type: FETCH_BOARD_CARDS_SUCCESS, cards});
    })
    .catch((error) => dispatch({type: FETCH_BOARD_CARDS_FAILURE, error}));
};

export const fetchCardActions = (boardId) => (dispatch) => {
  dispatch({ type: FETCH_BOARD_CARDS });
  Trello.get(`boards/${boardId}/cards`)
    .then((cards) => {
      dispatch({type: FETCH_BOARD_CARDS_SUCCESS, cards});
    })
    .catch((error) => dispatch({type: FETCH_BOARD_CARDS_FAILURE, error}));
};
