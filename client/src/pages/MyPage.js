import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { images } from '../data';
import { Main } from './styles';
import { FlexBoxSpaceBetween } from './PostCreate';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import ProfileImage from '../components/ProfileImage';

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
    padding: 28px 0px 12px 0px;
  }
  input:not(:placeholder-shown) + label {
    transform: translateY(-10px);
    opacity: 0.9;
  }
`;

const Input = styled.input`
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

const SmallTitle = styled.label`
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

const Textarea = styled.textarea`
  margin-bottom: 20px;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  resize: none;
  background: #fff;
  margin-bottom: 50px;
`;

const DeleteButton = styled.button`
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

const ModalButton = styled.button`
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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const Contents = styled.div`
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

const MyPage = () => {
  const [modal, setModal] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const toggleModal = () => {
    setModal(!modal);
  };

  const onClickThumbnail = useCallback((idx) => {
    setSelectedThumbnail(idx);
  }, []);

  return (
    <>
      <Main>
        <Form>
          <h4>
            MYPAGE <span>DOKHAK</span>
          </h4>
        </Form>
        <h3>Profile Image</h3>
        <FlexBoxSpaceBetween style={{ columnGap: '1rem' }}>
          {images.map((src, idx) => (
            <ProfileImage
              key={src}
              idx={idx}
              src={src}
              selectedThumbnail={selectedThumbnail}
              setSelectedThumbnail={onClickThumbnail}
            />
          ))}
        </FlexBoxSpaceBetween>
        <Label>
          <Input
            placeholder="Email"
            type="text"
            name="email"
            id="email"
          ></Input>
          <label htmlFor="email">Email:</label>
        </Label>

        <Label className="floating-label">
          <Input placeholder="Name" type="text" name="name" id="name"></Input>
          <label htmlFor="name">Name:</label>
        </Label>

        <Label className="floating-label">
          <Input
            placeholder="Mobile"
            type="tel"
            name="mobile"
            id="mobile"
          ></Input>
          <label htmlFor="mobile">Mobile:</label>
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

        <SmallTitle className="lab" htmlFor="stacks">
          기술스택:
        </SmallTitle>
        <Checkbox />

        <SmallTitle className="lab" htmlFor="introduction">
          나의 소개:
        </SmallTitle>

        <Textarea name="introduction" id="" cols="48" rows="10"></Textarea>

        <Button type="submit" big>
          확인
        </Button>

        <DeleteButton onClick={toggleModal}>회원탈퇴</DeleteButton>
        {modal && (
          <Container>
            <Overlay onClick={toggleModal} />
            <Contents>
              <h2>계정을 삭제하시겠습니까?</h2>
              <ModalButton onClick={toggleModal}>확인</ModalButton>
              <ModalButton onClick={toggleModal}>취소</ModalButton>
            </Contents>
          </Container>
        )}
      </Main>
    </>
  );
};

export default MyPage;
