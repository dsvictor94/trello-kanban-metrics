import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import {Grid, Row, Col} from 'react-flexbox-grid';

import * as Actions from '../actions';

const ScopeForm = ({boards, board, begins, ends, actions}) => {
  const selectedBoard = boards.filter((b) => (b.id === board));
  const hasBoarder = (selectedBoard && selectedBoard.length);
  const lists = hasBoarder ? selectedBoard[0].lists : [];
  return (
    <Paper style={{width: '100%'}}>
      <Row around='xs'>
        <Col>
          <SelectField
            style={{verticalAlign: 'bottom'}}
            floatingLabelText='Board'
            value={board}
            onChange={(event, index, value) => actions.changeBoard(value)}
            width={'auto'}
          >
            { boards.map((b) => <MenuItem value={b.id} key={b.id} primaryText={b.name} />) }
          </SelectField>
        </Col>
        <Col>
          <SelectField
            style={{verticalAlign: 'bottom'}}
            floatingLabelText='Begins'
            value={begins}
            disabled={!hasBoarder}
            onChange={(event, index, value) => actions.changeBegins(value)}
            width={'auto'}
          >
            { lists.map((b) => <MenuItem value={b.id} key={b.id} primaryText={b.name} />) }
          </SelectField>
        </Col>
        <Col>
          <SelectField
            style={{verticalAlign: 'bottom'}}
            floatingLabelText='Ends'
            value={ends}
            disabled={!hasBoarder}
            onChange={(event, index, value) => actions.changeEnds(value)}
            width={'auto'}
          >
            { lists.map((b) => <MenuItem value={b.id} key={b.id} primaryText={b.name} />) }
          </SelectField>
        </Col>
      </Row>
    </Paper>
  );
};

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  ...state.scope,
  ...state.data
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

/**
 * Connect the component to
 * the Redux store.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScopeForm);
