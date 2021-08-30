import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../actions/user';
import './dropdown.scss';

axios.defaults.withCredentials = true;

const LoginDropdown = ({ children, name }, props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    axios
      .post(
        'http://ec2-3-34-123-164.ap-northeast-2.compute.amazonaws.com/users/logout',
        null,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        dispatch(logout());
      })
      .then(() => props.history.push('/'))
      .catch(() => console.log('처리도중 문제가 발생하였습니다'));
  };

  // reset login status
  // useEffect(() => {
  //   dispatch(logout());
  // }, []);

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
            <li onClick={logoutHandler}>로그아웃</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default LoginDropdown;
