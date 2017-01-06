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

import thunk from 'redux-thunk';

const logger = createLogger();

/*
 * The enhancer are passed when
 * creating the Redux store to
 * add some extra functionality.
 *
 * In this case we add a logger
 * middleware that write some debug
 * information every time the
 * state is changed and the thunk
 * middleware that allows you to
 * write action creators that return
 * a function instead of an action.
 *
 * We also add the Redux DevTools
 * so we can easily debug the state.
 */
const enhancer = compose(
  applyMiddleware(thunk, logger),
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
