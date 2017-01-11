import React from 'react';
import {render} from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

/*
 * The Provider component provides
 * the React store to all its child
 * components so we don't need to pass
 * it explicitly to all the components.
 */
import {Provider} from 'react-redux';

import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';

import reducers from './reducers';
import App from './containers/App';
import DevTools from './containers/DevTools';

import { createLogicMiddleware } from 'redux-logic';

import {autenticate} from './actions';

const logger = createLogger();

import T from './drivers/Trello';

const deps = {
  Trello: T({key: 'adfca17411f60542fa057dd8af2fb028'})
};

import arrLogic from './logic';

const logicMiddleware = createLogicMiddleware(arrLogic, deps);

/*
 * The enhancer are passed when
 * creating the Redux store to
 * add some extra functionality.
 *
 * In this case we add a logger
 * middleware that write some debug
 * information every time the
 * state is changed and the logic
 * middleware for organizing all
 * business logic
 *
 * We also add the Redux DevTools
 * so we can easily debug the state.
 */
const enhancer = compose(
  applyMiddleware(logicMiddleware, logger),
  DevTools.instrument()
);

/*
 * This creates the store so we
 * can listen to changes and
 * dispatch actions.
 */
const store = createStore(reducers, enhancer);

const rootElement = document.getElementById('root');

injectTapEventPlugin();

render(
  <AppContainer>
    <Provider store={store}>
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>
  </AppContainer>,
  rootElement
);

store.dispatch(autenticate());

/**
 * This is for hot reloading so the
 * app updates every time the code of
 * the components change.
 */
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <div>
            <NextApp />
            <DevTools />
          </div>
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}
