import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../actions';

const App = ({actions}) => {
  return (
      <MuiThemeProvider>
        <div></div>
      </MuiThemeProvider>
  );
};

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  ...state.app
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
)(App);
