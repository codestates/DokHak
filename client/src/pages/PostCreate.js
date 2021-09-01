import React, { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

import { Main } from './styles';
import { thumbnails, stacksArray } from '../data';
import Thumbnail from '../components/Thumbnail';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

export const FlexBoxSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TitleInput = styled.input`
  flex-grow: 1;
  margin-right: 1.5rem;
  border: none;
  outline: none;
  font-size: 1.5rem;
  width: 100%;
  border-bottom: 1px solid #000;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const PostCreate = (props) => {
  // useEffect로 allStack 받아오거나 그냥 클라이언트에서 변수로 가지고 한다.
  //! 수정 버튼 눌러서 push로 온 거라면 props.location.state가 있다.
  //! 작성 버튼을 눌렀을 때는 없다. ?.로 있을 때만 처리하게 하고 ??는 그 앞에 거가 nullish일 때
  // A && B => A가 참일 때 B값을 가져라
  // A(null, undefined) ?? B => A가 nullish 값이면 B를 가져라
  if (props.location.state?.prevData) {
    console.log(props.location.state.prevData);
  }

  const [image, setImage] = useState(props.location.state?.prevData.image ?? 0);
  const [title, setTitle] = useState(
    props.location.state?.prevData.title ?? ''
  );
  const [content, setContent] = useState(
    props.location.state?.prevData.content ?? ''
  );
  const [checkedStacks, setCheckedStacks] = useState(
    Array(stacksArray.length).fill(false)
  );

  useMemo(() => {
    if (props.location.state) {
      const tmp = [...checkedStacks];
      props.location.state.prevData.stacks.forEach((idx) => {
        tmp[idx - 1] = true;
      });
      setCheckedStacks(tmp);
    }
  }, []);

  const onClickImage = (idx) => {
    setImage(idx);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeStackCheckbox = (position) => {
    const updatedCheckedStacks = checkedStacks.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedStacks(updatedCheckedStacks);
  };
  const onClickBtn = async () => {
    // API 쏘세요!
    // POST | Add a post (cookie / stacks, image, title, content)
    const stacks = checkedStacks
      .map((checkedStack, idx) => (checkedStack ? idx + 1 : null))
      .filter((x) => x);

    try {
      // ! 여기
      // ! 수정이면 새로 만들면 안 되고, 미리 있던 거 업뎃
      if (props.location.state?.prevData.postId) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/posts/${props.location.state.prevData.postId}`,
          {
            image,
            title,
            content,
            stackId: stacks,
          }
        );

        window.location.replace(
          `/posts/${props.location.state.prevData.postId}`
        );
      } else {
        const postData = await axios.post(
          `${process.env.REACT_APP_API_URL}/posts`,
          {
            image,
            title,
            content,
            stackId: stacks,
          }
        );
        window.location.replace(`/posts/${postData.data.data.postId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Main>
      {/* map으로 Thumbnail */}
      {/* Checkbox Component */}
      {/* SmallButton Component */}
      {/* Editor Component */}
      <h3>Thumbnail</h3>
      <FlexBoxSpaceBetween style={{ columnGap: '1rem' }}>
        {thumbnails.map((src, idx) => (
          <Thumbnail
            key={src}
            idx={idx}
            src={src}
            image={image}
            onClickImage={onClickImage}
          />
        ))}
      </FlexBoxSpaceBetween>

      <FlexBoxSpaceBetween style={{ marginTop: '40px' }}>
        <TitleInput
          placeholder="Title"
          value={title}
          onChange={(e) => onChangeTitle(e)}
        />

        <Button onClick={() => onClickBtn()}>확인</Button>
      </FlexBoxSpaceBetween>

      <Checkbox
        stacks={stacksArray}
        checkedStacks={checkedStacks}
        onChange={onChangeStackCheckbox}
      />
      <div style={{ height: '30px' }}></div>
      <MDEditor value={content} onChange={setContent} height={400} />
    </Main>
  );
};

export default PostCreate;
