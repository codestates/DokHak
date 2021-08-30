import React, { useState, useCallback } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

import { Main } from './styles';
import { thumbnails } from '../data';
import Thumbnail from '../components/Thumbnail';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

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

const PostCreate = () => {
  const [image, setImage] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [checkedStacks, setCheckedStacks] = useState(
    Array(stacksD.length).fill(false)
  );

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
  const onClickBtn = (data) => {
    // API 쏘세요!
    // POST | Add a post (cookie / stacks, image, title, content)
    const stacks = data.checkedStacks
      .map((checkedStack, idx) => (checkedStack ? idx + 1 : null))
      .filter((x) => x);
    data.stacks = stacks;
    delete data.checkedStacks;
    console.log(data);
  };

  useEffect(async () => {
    console.log('useEffect');
    try {
      const post = await axios.get(
        `http://ec2-3-34-123-164.ap-northeast-2.compute.amazonaws.com/posts`
      );
      console.log(post);
      // const stacks = await axios.get(`https://dokhak.tk/stacks`);
      // const stacks = ['React', 'Vue.js', 'Angular', 'Node.js', 'Django'];

      const { title, content, username, stackIds } = post;
      setTitle(title);
      setContent(content);
      setUsername(username);
      setStacks(stackIds.map((stackId) => stacks[stackId - 1]));
    } catch (err) {
      console.log(err);
    }
  }, []);

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

      <FlexBoxSpaceBetween>
        <TitleInput
          placeholder="Title"
          value={title}
          onChange={(e) => onChangeTitle(e)}
        />

        <Button
          onClick={() => onClickBtn({ checkedStacks, image, title, content })}
        >
          확인
        </Button>
      </FlexBoxSpaceBetween>

      <Checkbox stacks={stacksD} onChange={onChangeStackCheckbox} />
      <MDEditor value={content} onChange={setContent} height={400} />
    </Main>
  );
};

export default PostCreate;
