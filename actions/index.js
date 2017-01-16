export const AUTENTICATE_TRELLO = 'AUTENTICATE_TRELLO';
export const AUTENTICATE_TRELLO_SUCCESS = 'AUTENTICATE_TRELLO_SUCCESS';
export const AUTENTICATE_TRELLO_FAILURE = 'AUTENTICATE_TRELLO_FAILURE';

export const UNAUTENTICATE_TRELLO = 'UNAUTENTICATE_TRELLO';

export const FETCH_BOARDS_DATA = 'FETCH_BOARDS_DATA';
export const FETCH_BOARDS_DATA_SUCCESS = 'FETCH_BOARDS_DATA_SUCCESS';
export const FETCH_BOARDS_DATA_FAILURE = 'FETCH_BOARDS_DATA_FAILURE';

export const FETCH_BOARD_DATA = 'FETCH_BOARD_DATA';
export const FETCH_BOARD_DATA_SUCCESS = 'FETCH_BOARD_DATA_SUCCESS';
export const FETCH_BOARD_DATA_FAILURE = 'FETCH_BOARD_DATA_FAILURE';

export const UPDATE_THROUGHPUT = 'UPDATE_THROUGHPUT';

export const CHANGE_BOARD = 'CHANGE_BOARD';
export const CHANGE_BEGINS = 'CHANGE_BEGINS';
export const CHANGE_ENDS = 'CHANGE_ENDS';

export const autenticate = () => ({ type: AUTENTICATE_TRELLO });

export const unautenticate = () => ({ type: UNAUTENTICATE_TRELLO });

export const fetchBoardsData = () => ({type: FETCH_BOARDS_DATA});

export const fetchBoardData = (board) => ({type: FETCH_BOARD_DATA, board});

export const updateThroughput = (throughput) => ({
  type: UPDATE_THROUGHPUT,
  throughput
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
