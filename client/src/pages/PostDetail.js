import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

import Button from '../components/Button';
import Tag from '../components/Tag';
import { FlexBoxSpaceBetween } from './PostCreate';

import { Main } from './styles';

const stacks = [
  'React',
  'Vue.js',
  'Angular',
  'Node.js',
  'Django',
  'Spring',
  'Flutter',
  'React Native',
];

const Title = styled.h1`
  width: 100%;
  border: none;
  margin-bottom: 1.5rem;
  outline: none;
  font-size: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const TagAuthorWrapper = styled.div`
  /* width: inherit; */
  display: flex;
  text-align: center;
  outline: none;
  margin-top: 5px;
  margin-bottom: 40px;

  & > :first-child {
    margin-right: calc(10px + 20px);
  }

  & > :last-child {
    margin-left: auto;
    flex-shrink: 0;
    line-height: 1;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  row-gap: 1rem;
  column-gap: 1rem;
`;

const PostDetail = ({ postId }) => {
  // const [image, setImage] = useState(0);
  const [title, setTitle] = useState('방가방가');
  const [content, setContent] = useState(`# Hello World

**Hello world!!!**

![](https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container">
      <MEDitor
        value={value}
        onChange={setValue}
      />
      <MDEditor.Markdown source={value} />
    </div>
  );
}
\`\`\``);
  const [username, setUsername] = useState('김코딩');
  const [stacks, setStacks] = useState([]);
  const [author, setAuthor] = useState(false);

  useEffect(async () => {
    try {
      const post = await axios.get(`${process.env.REACT_APP_API_URL}posts/1`);
      // const stacks = await axios.get(`https://dokhak.tk/stacks`);
      const stackList = ['React', 'Vue.js', 'Angular', 'Node.js', 'Django'];

      const { title, content, username, stacks } = post;
      setTitle(title);
      setContent(content);
      setUsername(username);
      setStacks(stacks.map((stack) => stackList[stack - 1]));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Main>
      {/* 게시글 본문 */}
      <FlexBoxSpaceBetween>
        <Title>{title}</Title>
        {author && (
          <div style={{ display: 'flex' }}>
            <Button>수정</Button>
            <span style={{ width: '20px' }}></span>
            <Button>삭제</Button>
          </div>
        )}
      </FlexBoxSpaceBetween>
      <TagAuthorWrapper>
        <TagWrapper>
          {stacks.map((stack, idx) => (
            <Tag key={idx}>{stack}</Tag>
          ))}
        </TagWrapper>
        <h3>{username}</h3>
      </TagAuthorWrapper>
      <MDEditor.Markdown source={content} />
      {/* Comment Component */}
    </Main>
  );
};

export default PostDetail;
