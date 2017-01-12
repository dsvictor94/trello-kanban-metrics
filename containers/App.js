import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Grid, Row} from 'react-flexbox-grid';

import FlatButton from 'material-ui/FlatButton';
import Bar from '../components/Bar';
import {Tabs, Tab} from 'material-ui/Tabs';

import ScopeForm from './ScopeForm';

import * as Actions from '../actions';

const App = ({title, autenticated, fething, actions}) => {
  const login = <FlatButton label='Login' onTouchTap={actions.autenticate}/>;
  const logout = <FlatButton label='Logout' onTouchTap={actions.unautenticate}/>;
  let ok;
  const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400
    }
  };

  if (autenticated) {
    ok = <Row><ScopeForm /></Row>;
  };
  return (
      <MuiThemeProvider>
        <Grid style={{maxWidth: '800px', margin: 'auto'}}>
          <Row>
            <Bar
              title={title}
              fething={fething}
              iconElementRight={autenticated ? logout : login}/>
            </Row>
            {ok}
            <Row>
              <Tabs>
                <Tab label='Métricas' >
                  <div>
                    <h2 style={styles.headline}>Métricas</h2>
                    <p>
                      This is an example tab.
                    </p>
                    <p>
                      You can put any sort of HTML or react component in here. It even keeps the component state!
                    </p>
                  </div>
                </Tab>
                <Tab label='Estimativas' >
                  <div>
                    <h2 style={styles.headline}>Estimativas</h2>
                    <p>
                      This is another example tab.
                    </p>
                  </div>
                </Tab>
                <Tab
                  label='Relatórios'
                  data-route='/home' >
                  <div>
                    <h2 style={styles.headline}>Relatórios</h2>
                    <p>
                      This is a third example tab.
                    </p>
                  </div>
                </Tab>
              </Tabs>
          </Row>
        </Grid>
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
