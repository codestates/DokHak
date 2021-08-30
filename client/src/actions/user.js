export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const login = (data) => {
  return {
    type: LOG_IN,
    // payload: {
    //   id,
    //   image,
    // },
    payload: {
      email: data.email,
      name: '김코딩',
      phone: '010-0000-000',
      image: 1,
      info: 'djskdfjsdlfksldkfaslkdjfalksdjflkasjdflksjdflksjflkjsdf',
      stacks: [1, 3, 5],
    },
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
  };
};
