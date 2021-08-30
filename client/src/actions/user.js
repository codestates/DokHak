export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const login = (data) => {
  return {
    type: LOG_IN,
    payload: {
      email: data.email,
      name: data.name,
      phone: data.phone,
      image: data.image,
      info: data.info,
      stacks: data.stack,
    },
    isLogin: true,
  };
};

export const signup = (data) => {
  return {
    type: SIGN_UP,
    payload: {
      email: data.email,
      name: data.name,
      phone: data.phone,
      image: data.image,
      info: data.info,
      stacks: data.stack,
    },
    isLogin: true,
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
    isLogin: false,
  };
};
