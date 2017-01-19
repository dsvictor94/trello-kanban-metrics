
import { createLogic } from 'redux-logic';
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
  FETCH_ACTIONS_FAILURE,

  CHANGE_BOARD,
  CHANGE_BEGINS,
  CHANGE_ENDS,

  fetchBoards,
  fetchActions,
  changeBegins,
  changeEnds,
  updateThroughput,
  updateLeadTime
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
        dispatch(fetchBoards());
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
  type: FETCH_BOARDS,
  cancelType: FETCH_BOARDS_FAILURE,
  latest: true, // take latest only

  process({ Trello, getState }, dispatch) {
    const params = {lists: 'all', list_fields: 'name', fields: 'name,desc'};
    Trello.get('/member/me/boards', params)
      .then((boards) => {
        dispatch({type: FETCH_BOARDS_SUCCESS, boards});
      })
      .catch((error) => dispatch({type: FETCH_BOARDS_FAILURE, error}));
  }
});

export const boardChangesLogic = createLogic({
  type: CHANGE_BOARD,

  validate({getState, action}, allow, reject) {
    const board = getState().scope.board;
    if (board !== action.value) {
      allow(action);
    } else {
      reject(action);
    }
  },

  process({ getState }, dispatch, done) {
    const boards = getState().data.boards;
    const board = getState().scope.board;
    const selectedBoard = boards.filter((b) => (b.id === board));
    const hasBoarder = (selectedBoard && selectedBoard.length);
    const lists = hasBoarder ? selectedBoard[0].lists : [];
    if (lists) {
      dispatch(changeBegins(lists[0].id));
      dispatch(changeEnds(lists[lists.length - 1].id));
    }
    dispatch(fetchActions(board));
    done();
  }
});

export const boardDataFetchLogic = createLogic({
  type: FETCH_ACTIONS,
  cancelType: FETCH_ACTIONS_FAILURE,
  latest: true,

  process({ Trello, getState, action }, dispatch) {
    const actions = [
      'createCard',
      'copyCard',
      'moveCardToBoard',
      'convertToCardFromCheckItem',
      'deleteCard',
      'moveCardFromBoard',
      'updateCard'
    ].join(',');
    const params = { actions, actions_limit: '1000' };
    Trello.get(`/boards/${action.board}`, params)
      .then(({actions}) => {
        dispatch({type: FETCH_ACTIONS_SUCCESS, actions});
      })
      .catch(() => dispatch({type: FETCH_ACTIONS_FAILURE}));
  }
});

export const calculateThroughput = createLogic({
  type: [FETCH_ACTIONS_SUCCESS, CHANGE_ENDS],

  validate({getState, action}, allow, reject) {
    if (action.type === CHANGE_ENDS && !getState().data.actions.length) {
      reject(action);
    } else {
      allow(action);
    }
  },

  process({getState, action}, dispatch) {
    const CREATE_ACTIONS = ['createCard', 'convertToCardFromCheckItem', 'moveCardToBoard', 'updateCard'];

    const actions = getState().data.actions
      .filter((a) => CREATE_ACTIONS.includes(a.type))
      .filter((a) => {
        const {list, listAfter} = a.data;
        if (a.type === 'updateCard' && !listAfter) return false;
        return (a.type === 'updateCard' ? listAfter : list).id === getState().scope.ends;
      });

    if (actions.length) {
      const first = new Date(actions[0].date);
      const last = new Date(actions[actions.length - 1].date);
      const count = actions.length;

      const throughput = (count - 1) / days_between(first, last);

      dispatch(updateThroughput(throughput));
    } else {
      dispatch(updateThroughput(NaN));
    }
  }
});

export const calculateLeadTime = createLogic({
  type: [FETCH_ACTIONS_SUCCESS, CHANGE_ENDS, CHANGE_BEGINS],

  validate({getState, action}, allow, reject) {
    if ([CHANGE_ENDS, CHANGE_BEGINS].includes(action.type) && !getState().data.actions.length) {
      reject(action);
    } else {
      allow(action);
    }
  },

  process({getState, action}, dispatch) {
    const {begins, ends} = getState().scope;
    const cardLeadTime = Object.values(reduce_actions(getState().data.actions))
      .map(card => card.filter(action => [begins, ends].includes(action.list)))
      .map(card => card.filter(action => action.in))
      .filter(card => card.length === 2)
      .filter(card => card[1].list === begins && card[0].list === ends)
      .map(card => { console.log(card); return card; })
      .map(card => card[0].date - card[1].date);
    if (cardLeadTime.length > 0) {
      const avg = cardLeadTime.reduce((acc, v) => acc + v) / cardLeadTime.length;
      console.log('@@@@@', avg);
      dispatch(updateLeadTime(avg / (1000 * 60 * 60 * 24)));
    } else {
      dispatch(updateLeadTime(NaN));
    }
  }
});

export default [
  autenticateLogic,
  unautenticateLogic,
  boardsFetchLogic,
  boardChangesLogic,
  boardDataFetchLogic,
  calculateThroughput,
  calculateLeadTime
];

// PRIVATE HELPERS

function days_between(date1, date2) {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(date1_ms - date2_ms);

  // Convert back to days and return
  return difference_ms / ONE_DAY;
}

// Trello_actios -> [{card: [{list, date, in}]}]
function reduce_actions(actions) {
  const result = {};

  for (const {type, data, date} of actions) {
    if (!(data.card.id in result)) result[data.card.id] = [];
    const card = result[data.card.id];
    switch (type) {
      case 'createCard':
      case 'copyCard':
      case 'moveCardToBoard':
      case 'convertToCardFromCheckItem':
        card.push({list: data.list.id, date: new Date(date), in: true});
        break;
      case 'deleteCard':
      case 'moveCardFromBoard':
        card.push({list: data.list.id, date: new Date(date), in: false});
        break;
      case 'updateCard':
        if ('listAfter' in data && 'listBefore' in data) {
          card.push({list: data.listAfter.id, date: new Date(date), in: true});
          card.push({list: data.listBefore.id, date: new Date(date), in: false});
        }
        break;
    }
  }
  return result;
}
