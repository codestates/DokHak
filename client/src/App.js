import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import './App.css';

import PageTemplate from './PageTemplate';

import User from './pages/User';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Post from './pages/Post';
import PostCreate from './pages/PostCreate';
import PostDetail from './pages/PostDetail';
import MyPage from './pages/MyPage';

// import { login } from './actions/user';
// import { images } from './data';

// const Container = styled.div`
//   ${({ theme }) => theme.align.positionCenter}
// `;

function App() {
  // const images = useSelector((state) => state.images);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [imgObj, setImgObj] = useState({});

  const handleLogin = (id, image) => {
    dispatch(login(id, image));
    setImgObj(...images.filter((img) => img.id === image));
  };

  return (
    <>
      {/* <Container>되나요?</Container>
      <button onClick={() => handleLogin(5, 3)}>LOGIN ACTION 발생!</button>
      <div>USER ID : {user.data?.id}</div>
      <div>USER IMAGE ID : {user.data?.image}</div>
      {imgObj.length !== 0 && <img src={imgObj.img} alt={imgObj.name} />} */}
      <PageTemplate>
        <Switch>
          <Route exact path="/">
            <User />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/postcreate">
            <PostCreate />
          </Route>
          <Route path="/postdetail">
            <PostDetail />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
        </Switch>
      </PageTemplate>
    </>
  );
}

export default App;
