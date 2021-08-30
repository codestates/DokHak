import { LOG_IN, LOG_OUT } from '../actions/user';
import { userInitialState } from './initialState';

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLogin: true,
        data: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isLogin: false,
        data: null,
      };
    default:
      return state;
  }
};

export default user;
