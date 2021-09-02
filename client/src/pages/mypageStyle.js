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
  height: 56px;
  border: none;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  box-sizing: border-box;
  transition: all 0.2s linear;
  color: #37373e;
  /* font-weight: 400; */
  /* appearance: none; */
  &:focus {
    border-bottom: solid 1px #37373e;
    outline: 0;
  }
`;

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

export const DeleteButton = styled.button`
  color: #37373e;
  font-size: 14px;
  padding: 3px;
  font-weight: 400;
  transition: all 0.2s ease;
  margin: 40px 0;
  text-decoration: none;
  border: none;
  opacity: 0.6;

  &:hover {
    color: #ffc700;
  }
`;

export const ModalButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: #37373e;
  color: white;

  padding: 3px;
  font-weight: 400;
  transition: all 0.2s ease;
  margin: 80px 15px 0 15px;
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 0.5;
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

export const Contents = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #ffffff;
  padding: 70px 130px 60px;
  border-radius: 5px;
  max-width: 600px;
  min-width: 300px;
  text-align: center;
  color: #37373e;
`;
