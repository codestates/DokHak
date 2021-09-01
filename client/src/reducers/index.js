import { combineReducers } from 'redux';

import user from './user';
import post from './post';
import comment from './comment';

const reducer = combineReducers({
  user,
  post,
  comment,
});

export default reducer;
