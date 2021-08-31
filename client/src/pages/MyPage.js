import React, { useState, useCallback } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/user';

import { Main } from './styles';
import { FlexBoxSpaceBetween } from './PostCreate';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import ProfileImage from '../components/ProfileImage';
import {
  Form,
  Label,
  Input,
  SmallTitle,
  Textarea,
  DeleteButton,
  Container,
  Overlay,
  Contents,
  ModalButton,
} from './mypageStyle';

import { images, stacks, stacksArray } from '../data';

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
        <Checkbox stacks={stacksArray} />

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
