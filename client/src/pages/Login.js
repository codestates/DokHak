import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

import { useDispatch } from 'react-redux';
import { login } from '../actions/user';

import { Main } from './styles';
import Button from '../components/Button';
import { Form, GithubLogin, Input, Label, SignupText } from './loginStyle';

import ConsoleHelper from '../ConsoleHelper.js';

const Login = (props) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  ConsoleHelper(loginInfo);

  const loginHandler = () => {
    const { email, password } = loginInfo;
    const isOk = email !== '' && password !== '';

    if (!isOk) {
      setErrorMessage('이메일과 비밀번호를 모두 입력하세요');
    } else {
      setErrorMessage('');
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/login`, loginInfo, {
          headers: {
            withCredentials: true,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          ConsoleHelper(`여기는 res`, res.headers, res);
          dispatch(login(res.data.data[0]));
        })
        .then(() => {
          props.history.push('/');
        })
        .catch(() => setErrorMessage('회원정보가 일치하지 않습니다'));
    }
    ConsoleHelper('axiossss');
  };

  return (
    <>
      <Main>
        <Form>
          <h4>
            LOGIN <span>DOKHAK</span>
          </h4>
          <p>Welcome back to DOKHAK!</p>
        </Form>

        <Label>
          <Input
            value={loginInfo.email}
            onChange={inputHandler}
            placeholder="Email"
            type="text"
            name="email"
            id="email"
          ></Input>
          <label htmlFor="email">Email:</label>
        </Label>

        <Label>
          <Input
            value={loginInfo.password}
            onChange={inputHandler}
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          ></Input>
          <label htmlFor="password">Password:</label>
        </Label>

        <div
          role="alert"
          style={{
            color: 'orangered',
            textAlign: 'center',
            height: '50px',
          }}
        >
          {errorMessage}
        </div>

        <Button type="button" big onClick={loginHandler} login={true}>
          Login
        </Button>

        <SignupText>
          아직 회원이 아니신가요?
          <Link to="/signup">회원가입</Link>
        </SignupText>
      </Main>
    </>
  );
};

export default Login;
