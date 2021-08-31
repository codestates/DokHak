import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { signup } from '../actions/user';
import { useDispatch } from 'react-redux';

import { images } from '../data';
import { Main } from './styles';
import { FlexBoxSpaceBetween } from './PostCreate';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import Thumbnail from '../components/Thumbnail';
import ProfileImage from '../components/ProfileImage';

axios.defaults.withCredentials = true;

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

const Check = styled.div`
  justify-content: space-between;
`;

const stacksD = [
  'React',
  'Vue.js',
  'Angular',
  'Node.js',
  'Django',
  'Spring',
  'Flutter',
  'React Native',
];

const Signup = ({ props }) => {
  //에러 메세지
  const [errorMessage, setErrorMessage] = useState('');

  //스택 업데이트
  const [checkedStacks, setCheckedStacks] = useState(
    Array(stacksD.length).fill(false)
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

    let body = {
      email: email,
      name: name,
      phone: phone,
      image: selectedThumbnail,
      info: info,
      stacks: checkedStacks,
    };
    console.log(`여기가 body`, body);

    const isOk =
      email !== '' &&
      password !== '' &&
      name !== '' &&
      phone !== '' &&
      selectedThumbnail !== '' &&
      info !== '' &&
      checkedStacks !== [];

    if (!isOk) {
      setErrorMessage('입력칸들을 모두 입력하세요');
    } else {
      setErrorMessage('');
      axios
        .post(
          'http://ec2-3-34-123-164.ap-northeast-2.compute.amazonaws.com/users/signup',
          body,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(signup(res.data.data[0]));
        })
        .then(() => {
          props.history.push('/login');
        })
        .catch(() => setErrorMessage('회원가입에 실패하였습니다'));
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
            type="password"
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
        <Checkbox stacks={stacksD} onChange={onChangeStackCheckbox} />

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
