import React, { useState, useCallback } from 'react';
import axios from 'axios';
require('dotenv').config();

import { Main } from './styles';
import { FlexBoxSpaceBetween } from './PostCreate';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import ProfileImage from '../components/ProfileImage';
import { Form, Label, Input, SmallTitle, Textarea } from './signupStyle';

import { images, stacksArray } from '../data';

const Signup = (props) => {
  //에러 메세지
  const [errorMessage, setErrorMessage] = useState('');

  //스택 업데이트
  const [checkedStacks, setCheckedStacks] = useState(
    Array(stacksArray.length).fill(false)
  );
  const onChangeStackCheckbox = (position) => {
    const updatedCheckedStacks = checkedStacks.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedStacks(updatedCheckedStacks);
    console.log(`여기는 스택 선택`, checkedStacks);
  };

  //썸네일
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const onClickThumbnail = useCallback((idx) => {
    setSelectedThumbnail(idx);
    console.log(`여기는 썸네일 선택`, selectedThumbnail);
  }, []);

  //인풋 인포
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    info: '',
  });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setSignupInfo({ ...signupInfo, [name]: value });
    console.log(`여기는 signupInfo`, signupInfo);
  };

  //회원가입 버튼 핸들러
  const signupHandler = () => {
    const { email, password, name, phone, info } = signupInfo;

    const stack = checkedStacks
      .map((checkedStack, idx) => (checkedStack ? idx + 1 : null))
      .filter((x) => x);

    let body = {
      email: email,
      name: name,
      phone: phone,
      image: selectedThumbnail,
      info: info,
      stacks: stack,
      password: password,
    };
    console.log(`여기가 body`, body);

    const isOk =
      email !== '' &&
      password !== '' &&
      name !== '' &&
      phone !== '' &&
      selectedThumbnail !== '' &&
      info !== '' &&
      stack !== [];

    if (!isOk) {
      setErrorMessage('입력칸들을 모두 입력하세요');
    } else {
      setErrorMessage('');

      axios
        .post(`${process.env.REACT_APP_API_URL}/users/signup`, body, {
          headers: {
            withCredentials: true,
            'Content-Type': 'application/json',
          },
        })
        .then(() => props.history.push('/login'))
        .catch((err) => {
          console.log(err.response.data.message);
          if (err.response.data.message === 'Email exists') {
            setErrorMessage('중복된 이메일 입니다');
          } else if (err.response.data.message === 'Name exists') {
            setErrorMessage('중복된 이름 입니다');
          } else {
            setErrorMessage('회원가입에 실패하였습니다');
          }
        });
    }
  };

  return (
    <>
      <Main>
        <Form>
          <h4>
            SIGNUP <span>DOKHAK</span>
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
            value={signupInfo.email}
            onChange={inputHandler}
          ></Input>
          <label htmlFor="email">Email:</label>
        </Label>

        <Label className="floating-label">
          <Input
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            value={signupInfo.name}
            onChange={inputHandler}
          ></Input>
          <label htmlFor="name">Name:</label>
        </Label>

        <Label className="floating-label">
          <Input
            placeholder="Mobile"
            type="tel"
            name="phone"
            id="phone"
            value={signupInfo.phone}
            onChange={inputHandler}
          ></Input>
          <label htmlFor="mobile">Mobile:</label>
        </Label>

        <Label>
          <Input
            placeholder="Password"
            type="text"
            name="password"
            id="password"
            value={signupInfo.password}
            onChange={inputHandler}
          ></Input>
          <label htmlFor="password">Password:</label>
        </Label>

        <SmallTitle className="lab" htmlFor="stacks">
          기술스택:
        </SmallTitle>
        <Checkbox stacks={stacksArray} onChange={onChangeStackCheckbox} />

        <SmallTitle className="lab" htmlFor="introduction">
          나의 소개:
        </SmallTitle>

        <Textarea
          name="info"
          id="info"
          cols="48"
          rows="10"
          value={signupInfo.info}
          onChange={inputHandler}
        ></Textarea>
        <div role="alert" style={{ color: 'orangered', textAlign: 'center' }}>
          {errorMessage}
        </div>
        <Button type="submit" big onClick={signupHandler}>
          확인
        </Button>
      </Main>
    </>
  );
};

export default Signup;
