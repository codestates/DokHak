import React from 'react';
import { Main } from './styles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/user';

// const LoginButtonWrapper = ({ className, children }) => (
//   <div className={className}>
//     <Button>{children}</Button>
//   </div>
// );

// const LoginButton = styled(LoginButtonWrapper)`
//   margin-top: 60px;
//   /* width: 100%; */
// `;

const Form = styled.form`
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  & > h4 {
    margin-bottom: 20px;
    color: #37373e;
    font-size: 28px;
    font-weight: 600;
  }
`;

const Label = styled.div`
  position: relative;
  margin-bottom: 10px;
  label {
    position: absolute;
    top: calc(50% - 7px);
    left: 0;
    opacity: 0;
    transition: all 0.2s ease-in;
  }
  input:not(:placeholder-shown) {
    padding: 28px 0px 0px 0px;
  }
  input:not(:placeholder-shown) + label {
    transform: translateY(-20px);
    opacity: 0.9;
  }
`;

const Input = styled.input`
  font-size: 16px;
  padding: 20px 0px;
  width: 100%;
  height: 85px;
  border: none;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  box-sizing: border-box;
  transition: all 0.2s linear;
  color: #37373e;
  &:focus {
    border-bottom: solid 1px #37373e;
    outline: 0;
  }
`;

const SignupText = styled.span`
  text-align: center;
  color: #37373e;
  font-size: 14px;
  padding: 3px;
  font-weight: 400;
  transition: all 0.2s ease;
  margin: 40px 0;
  text-decoration: none;
  a {
    color: #01369c;
    &:hover {
      color: #ffc700;
    }
  }
`;

const GithubLogin = styled.button`
  height: 35px;
  background: black;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px 0;
  border-radius: 5px;
  transition: all 0.3s ease 0s, width 0s;
  outline: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border: none;
  letter-spacing: 2.5px;
  font-size: 1rem;
  color: #fff;

  & > img {
    background: black;
    border-radius: 50%;
    height: 25px;
    margin-right: 10px;
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
  &:hover {
    background-color: #ffc700;
    cursor: pointer;
    box-shadow: 5px 12px 9px 1px rgba(55, 55, 62, 0.29);
    color: #fff;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(1);
    box-shadow: none;
    outline: 0;
  }
`;

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = (data) => {
    dispatch(login(data));
    // setImgObj(...images.filter((img) => img.id === image));
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
            placeholder="Email"
            type="text"
            name="email"
            id="email"
          ></Input>
          <label htmlFor="email">Email:</label>
        </Label>

        <Label>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          ></Input>
          <label htmlFor="password">Password:</label>
        </Label>
        <div style={{ marginTop: '80px' }}></div>
        {/*  */}
        <button onClick={() => handleLogin({ email: 'kimcoding@github.com' })}>
          로그인!
        </button>
        <Button
          type="submit"
          big
          onClick={() => handleLogin({ email: 'kimcoding@github.com' })}
        >
          Login
        </Button>
        {/* 깃허브 로그인은 온클릭 시 깃허브 OAuth로 API 요청보내서 Code 받아오고,우리 서버 API(/users/github)로 code를 보낸다 */}
        <GithubLogin type="submit" className="github">
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
