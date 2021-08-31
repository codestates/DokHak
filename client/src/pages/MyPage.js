import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/user';
import { images, stacksArray } from '../data';
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


const MyPage = (props) => {
  const dispatch = useDispatch();
  //에러메세지
  const [errorMessage, setErrorMessage] = useState('');


  //모달
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  //지금 현재 로그인된 유저 데이터 리덕스 스토어에서 가져오기
  const user = useSelector((state) => state.user);
  console.log(`리덕스 스토어에 저장된 유저`, user);
  const { email, image, info, name, phone, stacks } = user.data;

  //인풋 인포
  const [signupInfo, setSignupInfo] = useState({
    email: email,
    password: '',
    name: name,
    phone: phone,
    info: info,
  });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setSignupInfo({ ...signupInfo, [name]: value });
    console.log(`여기는 signupInfo`, signupInfo);
  };

  //썸네일
  const [selectedThumbnail, setSelectedThumbnail] = useState(image);
  const onClickThumbnail = useCallback((idx) => {
    setSelectedThumbnail(idx);
  }, []);

  //체크박스

  const [checkedStacks, setCheckedStacks] = useState(
    Array(stacksArray.length).fill(false)
  );
  //[1, 3, 5]
  useEffect(() => {
    console.log(`stacks출력`, stacks);
    const tmp = [...checkedStacks];
    stacks.forEach((idx) => {
      tmp[idx - 1] = true;
    });
    setCheckedStacks(tmp);
  }, []);

  const onChangeStackCheckbox = (position) => {
    const updatedCheckedStacks = checkedStacks.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedStacks(updatedCheckedStacks);
  };


  //회원 탈퇴
  const deleteHandler = () => {
    //토큰을 보내줘서 회원 탈퇴를 해야한다.
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(logout());
      })
      .then(() => {
        props.history.push('/');
      })
      .catch(() => setErrorMessage('처리도중 문제가 발생하였습니다'));
  };

  const patchHandler = () => {

    //true false를 [1, 3, 5]로 바꾸기
    const stacks = checkedStacks
      .map((checkedStack, idx) => (checkedStack ? idx + 1 : null))
      .filter((x) => x);
    console.log(stacks);

    //확인 버튼을 누르면 수정한 것이라고 간주되서 axios patch를 날린다.
    //날려서 돌아오는 respond로 리덕스 스토어를 업데이트 한다.
    let body = {
      email: email,
      name: name,
      phone: phone,
      image: selectedThumbnail,
      info: info,
      stacks: stacks,
      password: password,
    };
    console.log(`여기가 body`, body);

    const isOk =
      email !== '' &&
      name !== '' &&
      password !== '' &&
      phone !== '' &&
      selectedThumbnail !== '' &&
      info !== '' &&
      stacks !== [];

    if (!isOk) {
      setErrorMessage('입력칸들을 모두 입력하세요');
    } else {
      setErrorMessage('');

      axios
        .patch(`${process.env.REACT_APP_API_URL}/users`, body, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res);
          dispatch(login(res.data.data.usersWithStacks[0]));
        })
        .then(() => {
          props.history.push('/');
        })
        .catch(() => setErrorMessage('회원수정에 실패하였습니다'));
    }
  };

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
            value={email}
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
            value={name}
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
            value={phone}
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


        <Checkbox
          stacks={stacksArray}
          checkedStacks={checkedStacks}
          onChange={onChangeStackCheckbox}
        />



        <SmallTitle className="lab" htmlFor="introduction">
          나의 소개:
        </SmallTitle>

        <Textarea
          name="info"
          id="info"
          cols="48"
          rows="10"
          value={info}
          onChange={inputHandler}
        ></Textarea>

        <div role="alert" style={{ color: 'orangered', textAlign: 'center' }}>
          {errorMessage}
        </div>

        <Button type="submit" big onClick={patchHandler}>
          확인
        </Button>

        <DeleteButton onClick={toggleModal}>회원탈퇴</DeleteButton>
        {modal && (
          <Container>
            <Overlay onClick={toggleModal} />
            <Contents>
              <h2>계정을 삭제하시겠습니까?</h2>
              <ModalButton onClick={deleteHandler}>확인</ModalButton>
              <ModalButton onClick={toggleModal}>취소</ModalButton>
            </Contents>
          </Container>
        )}
      </Main>
    </>
  );
};

export default MyPage;
