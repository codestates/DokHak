import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
// import { images } from './data';

// const Container = styled.div`
//   ${({ theme }) => theme.align.positionCenter}
// `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  min-width: 512px;
  width: 80%;
`;

function App() {
  // const images = useSelector((state) => state.images);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
    // setImgObj(...images.filter((img) => img.id === image));
  };

  return (
    <>
      <button onClick={() => handleLogin()}>LOGIN ACTION 발생!</button>
      <Router>
        <Container>
          <Navbar />
          <Switch>
            <Route exact path="/" component={User} />
            <Route exact path="/user" component={User} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/postcreate" component={PostCreate} />
            <Route exact path="/postdetail" component={PostDetail} />
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
