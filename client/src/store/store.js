import { compose, createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(loggerMiddleware))
);

export default store;
