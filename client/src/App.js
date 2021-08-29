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

// import { login } from './actions/user';
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
      <Router>
        <Container>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <User />
            </Route>
            <Route path="/user">
              <User />
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
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
