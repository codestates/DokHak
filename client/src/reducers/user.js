import { LOGIN } from '../actions/user';
import { userInitialState } from './initialState';

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default user;
