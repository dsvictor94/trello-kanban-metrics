import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import Schedule from 'material-ui/svg-icons/action/schedule'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FlatButton from 'material-ui/FlatButton';

import Bar from '../components/Bar';
import SmallCard from '../components/SmallCard';

import ScopeForm from './ScopeForm';

import * as Actions from '../actions';

import css from './App.css';

const App = ({throughput, title, autenticated, fething, actions}) => {
  const login = <FlatButton label='Login' onTouchTap={actions.autenticate}/>;
  const logout = <FlatButton label='Logout' onTouchTap={actions.unautenticate}/>;
  let ok;
  if (autenticated) {
    const textThroughput = !isNaN(throughput) ? [throughput.toFixed(2), <small>card/day</small>] : 'Unknown';
    ok = [
      <ScopeForm key='1'/>,
      <div className={css.throughputArea} key='2'>
          <SmallCard icon={<TrendingUp />}>
            <h1>Throughput</h1>
            {textThroughput}
          </SmallCard>
          <SmallCard icon={<Schedule />}>
            <h1>Lead Time</h1>
            10<small>day</small>
          </SmallCard>
      </div>
    ];
  };
  return (
      <MuiThemeProvider>
        <div className={css.app}>
          <Bar
            title={title}
            fething={fething}
            iconElementRight={autenticated ? logout : login}/>
          {ok}
        </div>
      </MuiThemeProvider>
  );
};

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  ...state.app,
  throughput: state.metrics.throughput
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
