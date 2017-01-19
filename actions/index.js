export const AUTENTICATE_TRELLO = 'AUTENTICATE_TRELLO';
export const AUTENTICATE_TRELLO_SUCCESS = 'AUTENTICATE_TRELLO_SUCCESS';
export const AUTENTICATE_TRELLO_FAILURE = 'AUTENTICATE_TRELLO_FAILURE';

export const UNAUTENTICATE_TRELLO = 'UNAUTENTICATE_TRELLO';

export const FETCH_BOARDS = 'FETCH_BOARDS_DATA';
export const FETCH_BOARDS_SUCCESS = 'FETCH_BOARDS_SUCCESS';
export const FETCH_BOARDS_FAILURE = 'FETCH_BOARDS_FAILURE';

export const FETCH_ACTIONS = 'FETCH_ACTIONS';
export const FETCH_ACTIONS_SUCCESS = 'FETCH_ACTIONS_SUCCESS';
export const FETCH_ACTIONS_FAILURE = 'FETCH_ACTIONS_FAILURE';

export const UPDATE_THROUGHPUT = 'UPDATE_THROUGHPUT';
export const UPDATE_LEAD_TIME = 'UPDATE_LEAD_TIME';

export const CHANGE_BOARD = 'CHANGE_BOARD';
export const CHANGE_BEGINS = 'CHANGE_BEGINS';
export const CHANGE_ENDS = 'CHANGE_ENDS';

export const autenticate = () => ({ type: AUTENTICATE_TRELLO });

export const unautenticate = () => ({ type: UNAUTENTICATE_TRELLO });

export const fetchBoards = () => ({type: FETCH_BOARDS});

export const fetchActions = (board) => ({type: FETCH_ACTIONS, board});

export const updateThroughput = (throughput) => ({
  type: UPDATE_THROUGHPUT,
  throughput
});

export const updateLeadTime = (leadTime) => ({
  type: UPDATE_LEAD_TIME,
  leadTime
});

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
