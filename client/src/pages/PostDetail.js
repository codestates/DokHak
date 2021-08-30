import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';
import styled from 'styled-components';
import Tag from '../components/Tag';

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

const PostDetail = () => {
  const [value, setValue] = useState(`# Hello World

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

  return (
    <Main>
      {/* 게시글 본문 */}
      <Title>별 헤는 밤</Title>
      <TagAuthorWrapper>
        <TagWrapper>
          {stacks.map((stack, idx) => (
            <Tag key={idx}>{stack}</Tag>
          ))}
        </TagWrapper>
        <h3>김코딩</h3>
      </TagAuthorWrapper>
      <MDEditor.Markdown source={value} />
      {/* Comment Component */}
    </Main>
  );
};

export default PostDetail;
