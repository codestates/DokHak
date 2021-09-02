import React, { useEffect, useState, useCallback, useMemo } from 'react';
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

import ConsoleHelper from '../ConsoleHelper.js';

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

const PostDetail = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(``);
  const [postId, setPostId] = useState(0);
  const [username, setUsername] = useState('');
  const [stacks, setStacks] = useState([]);
  const [author, setAuthor] = useState(false);
  const [image, setImage] = useState(0);

  useMemo(async () => {
    try {
      const post = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/${props.match.params.id}`
      );
      setPostId(post.data.data.id);
      setTitle(post.data.data.title);
      setContent(post.data.data.content);
      setUsername(post.data.data.username);
      setStacks(post.data.data.stacks.map((stack) => stacksArray[stack - 1]));
      setAuthor(post.data.data.author);
      setImage(post.data.data.image);
    } catch (err) {
      ConsoleHelper(err);
      ConsoleHelper();
    }
  }, []);

  const onClickUpdateBtn = useCallback(async () => {
    ConsoleHelper(`수정버튼`);
    try {
      const tmpStacks = [];
      stacks.forEach((stack) => tmpStacks.push(stacksArray.indexOf(stack) + 1));

      props.history.push({
        pathname: '/post/add',
        state: {
          prevData: { postId, title, content, stacks: tmpStacks, image },
        },
      });
    } catch (err) {
      ConsoleHelper(err);
    }
  });
  const onClickDeleteBtn = useCallback(async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/posts/${props.match.params.id}`
      );
      ConsoleHelper('!지워짐!');
      props.history.push({
        pathname: '/posts',
      });
    } catch (err) {
      ConsoleHelper(err);
    }
  }, []);

  return (
    <Main>
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
      <Comment postId={props.match.params.id} />
    </Main>
  );
};

export default PostDetail;
