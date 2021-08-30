import React from 'react';
import { Link } from 'react-router-dom';

import './dropdown.scss';
// import { Link } from './Navbar';

const LoginDropdown = ({ children, name }) => {
  return (
    <>
      <div className="dropdown logindropdown">
        <Link className="dropbtn" style={{ paddingLeft: '0' }}>
          {children}
        </Link>
        <ul className="dropdown-content">
          <Link to={`/mypage`}>
            <li>마이페이지</li>
          </Link>
          <Link to={`/postcreate`}>
            <li>게시글 작성</li>
          </Link>
          <Link to={`/`}>
            <li>로그아웃</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default LoginDropdown;
