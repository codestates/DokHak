import styled from 'styled-components';

export const Form = styled.form`
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

export const Label = styled.div`
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
    padding: 28px 0px 5px 12px;
  }
  input:not(:placeholder-shown) + label {
    transform: translateY(-20px);
    opacity: 0.9;
  }
`;

export const Input = styled.input`
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

export const SignupText = styled.span`
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
    margin-left: 8px;
    &:hover {
      color: #ffc700;
    }
  }
`;

export const GithubLogin = styled.button`
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
