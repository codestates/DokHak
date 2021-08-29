import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { images } from '../data';
import { Main } from './styles';
import { FlexBoxSpaceBetween } from './PostCreate';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import Thumbnail from '../components/Thumbnail';

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

const Signup = () => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const onClickThumbnail = useCallback((idx) => {
    setSelectedThumbnail(idx);
  }, []);

  return (
    <>
      <Main>
        <Form>
          <h4>
            SIGNUP <span>DOKHAK</span>
          </h4>
        </Form>
        <FlexBoxSpaceBetween style={{ columnGap: '1rem' }}>
          {images.map((src, idx) => (
            <Thumbnail
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
        <Checkbox as={Check} />

        <SmallTitle className="lab" htmlFor="introduction">
          나의 소개:
        </SmallTitle>

        <Textarea name="introduction" id="" cols="48" rows="10"></Textarea>

        <Button type="submit" big>
          확인
        </Button>
      </Main>
    </>
  );
};

export default Signup;
