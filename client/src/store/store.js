import { compose, createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

let Middleware = [];
if (process.env.NODE_ENV === 'development') {
  Middleware = [loggerMiddleware];
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...Middleware))
);

export default store;
