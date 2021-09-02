import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

import { logout } from '../actions/user';
import './dropdown.scss';
import { stacksArray } from '../data';

import ConsoleHelper from '../ConsoleHelper.js';

const LoginDropdown = ({ children, name }, props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/logout`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        dispatch(logout());
      })
      .then(() => window.location.replace('/'))
      .catch((err) => {
        ConsoleHelper(err);
        ConsoleHelper('처리도중 문제가 발생하였습니다');
      });
  };

  return (
    <>
      <div className="dropdown logindropdown">
        <Link className="dropbtn" style={{ paddingLeft: '0' }}>
          {children}
        </Link>
        <ul className="dropdown-content">
          <Link to={`/mypage`} stacks={stacksArray}>
            <li>마이페이지</li>
          </Link>
          <Link to={`/post/add`}>
            <li>게시글 작성</li>
          </Link>
          <Link to={`/`}>
            <li onClick={logoutHandler}>로그아웃</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default LoginDropdown;
