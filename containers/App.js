import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FlatButton from 'material-ui/FlatButton';
import Bar from '../components/Bar';

import * as Actions from '../actions';

const App = ({title, autenticated, fething, actions}) => {
  const login = <FlatButton label='Login' onTouchTap={actions.autenticate}/>;
  const logout = <FlatButton label='Logout' onTouchTap={actions.unautenticate}/>;

  return (
      <MuiThemeProvider>
        <div style={{maxWidth: '800px', margin: 'auto'}}>
          <Bar
            title={title}
            fething={fething}
            iconElementRight={autenticated ? logout : login}/>
        </div>
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
