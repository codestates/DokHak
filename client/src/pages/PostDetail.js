import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

import Button from '../components/Button';
import Tag from '../components/Tag';
import Comment from '../components/Comment';
import { FlexBoxSpaceBetween } from './PostCreate';
import { Main } from './styles';
import { stacksArray } from '../data';

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

const PostDetail = (props, { postId }) => {
  // const [image, setImage] = useState(0);
  const [title, setTitle] = useState('방가방가');
  const [content, setContent] = useState(`# Hello World

**Hello world!!!**

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
  // const [stacks, setStacks] = useState([]);
  const [stacks, setStacks] = useState([1, 2, 5]);
  const [author, setAuthor] = useState(true);
  const [image, setImage] = useState(0);
  const [token, setToken] = useState(
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTYzMDM4NDcyNiwiZXhwIjoxNjMwNjQzOTI2fQ.P7ilb4q2KBoUwALQx3pGJbDJU6nuwvuVw3VTLOz2O1w`
  );

  useEffect(async () => {
    try {
      const post = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/${4}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const comments = await axios.get(
        `${process.env.REACT_APP_API_URL}/comments/${4}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const stacks = await axios.get(`https://dokhak.tk/stacks`);

      setTitle(post.data.data.title);
      setContent(post.data.data.content);
      setUsername(post.data.data.username);
      setStacks(post.data.data.stacks.map((stack) => stacksArray[stack - 1]));
      setAuthor(post.data.data.author);
      setImage(post.data.data.image);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onClickUpdateBtn = useCallback(async () => {
    // 게시글 수정 axios
    console.log(`수정버튼`);
    try {
      // await axios.patch(`${process.env.REACT_APP_API_URL}posts/${postId}`);

      // postCreate 페이지로 props.history.push()
      props.history.push({
        pathname: '/postcreate',
        state: { prevData: { title, content, stacks, image } },
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const onClickDeleteBtn = useCallback(async () => {
    // 게시글 삭제 axios
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/3`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('!지워짐!');
      // postCreate 페이지로 props.history.push()
      // props.history.push({
      //   pathname: '/',
      // });
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
            <Button onClick={onClickUpdateBtn}>수정</Button>
            <span style={{ width: '20px' }}></span>
            <Button onClick={onClickDeleteBtn}>삭제</Button>
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

      <Comment />
    </Main>
  );
};

export default PostDetail;
