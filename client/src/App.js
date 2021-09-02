import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import './App.css';

import User from './pages/User';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Post from './pages/Post';
import PostCreate from './pages/PostCreate';
import PostDetail from './pages/PostDetail';
import MyPage from './pages/MyPage';

import Navbar from './components/Navbar';

import { login } from './actions/user';

import ConsoleHelper from './ConsoleHelper.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  min-width: 512px;
  width: 80%;
`;

function App() {
  const dispatch = useDispatch();
  useEffect(async () => {
    let userInfo = await axios
      .get(`${process.env.REACT_APP_API_URL}/users/token`)
      .catch((err) => {
        ConsoleHelper('아직은 로그인 전이다.');
      });
    if (userInfo) {
      ConsoleHelper(userInfo);
      dispatch(login(userInfo.data.data[0]));
    }
  }, []);
  return (
    <>
      <Router>
        <Container>
          <Navbar />
          <Switch>
            <Route exact path="/" component={User} />
            <Route exact path="/users" component={User} />
            <Route exact path="/users/stacks/:id" component={User} />
            <Route exact path="/posts" component={Post} />
            <Route exact path="/posts/stacks/:id" component={Post} />
            <Route exact path="/post/add" component={PostCreate} />
            <Route exact path="/posts/:id" component={PostDetail} />
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
