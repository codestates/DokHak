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
    padding: 28px 0px 12px 0px;
  }
  input:not(:placeholder-shown) + label {
    transform: translateY(-10px);
    opacity: 0.9;
  }
`;

export const Input = styled.input`
  font-size: 16px;
  padding: 20px 0px;
  width: 100%;
  height: 56px;
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

import styled from 'styled-components';

export const SmallTitle = styled.label`
  display: inline-block;
  font-size: 16px;
  height: 56px;
  padding-top: 25px;
  margin-bottom: 10px;
  &:nth-child(6) {
    margin-top: 15px;
  }
  &:nth-child(8) {
    margin-top: 10px;
  }
`;

export const Textarea = styled.textarea`
  margin-bottom: 20px;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  resize: none;
  background: #fff;
  margin-bottom: 50px;
`;

export const Check = styled.div`
  justify-content: space-between;
`;
