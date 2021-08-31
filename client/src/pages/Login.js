import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

import { useDispatch } from 'react-redux';
import { login } from '../actions/user';

import { Main } from './styles';
import Button from '../components/Button';
import { Form, GithubLogin, Input, Label, SignupText } from './loginStyle';

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
  console.log(loginInfo);

  const loginHandler = () => {
    const { email, password } = loginInfo;
    const isOk = email !== '' && password !== '';

    if (!isOk) {
      setErrorMessage('이메일과 비밀번호를 모두 입력하세요');
    } else {
      setErrorMessage('');
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/login`, loginInfo, {
          // withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(`여기는 res`, res.headers, res);
          dispatch(login(res.data.data[0]));
        })
        .then(() => {
          props.history.push('/');
        })
        .catch(() => setErrorMessage('회원정보가 일치하지 않습니다'));
    }
    console.log('axiossss');
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

        <div role="alert" style={{ color: 'orangered', textAlign: 'center' }}>
          {errorMessage}
        </div>
        <div style={{ marginTop: '80px' }}></div>

        <Button type="button" big onClick={loginHandler}>
          Login
        </Button>
        {/* 깃허브 로그인은 온클릭 시 깃허브 OAuth로 API 요청보내서 Code 받아오고,우리 서버 API(/users/github)로 code를 보낸다 */}
        <GithubLogin type="button" className="github">
          Github Login
          <img
            alt="github"
            src="https://alothemes.com/pub/media/wysiwyg/alothemes/homepage/005-github-1.png"
          />
        </GithubLogin>

        <SignupText>
          아직 회원이 아니신가요?
          <Link to="/signup">회원가입</Link>
        </SignupText>
      </Main>
    </>
  );
};

export default Login;
