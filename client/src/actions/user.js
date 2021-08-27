export const LOGIN = 'LOGIN';

export const login = (id, image) => {
  return {
    type: LOGIN,
    payload: {
      id,
      image,
    },
  };
};
