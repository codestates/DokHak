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

const PostDetail = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(``);
  const [postId, setPostId] = useState(0);
  const [username, setUsername] = useState('');
  const [stacks, setStacks] = useState([]);
  const [author, setAuthor] = useState(false);
  const [image, setImage] = useState(0);

  useMemo(async () => {
    // componentWillMount events
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
  //  useEffect(() => {
  //    // componentDidMount events
  //    return () => {
  //      // componentWillUnmount events
  //    };
  //  }, []);

  const onClickUpdateBtn = useCallback(async () => {
    // 게시글 수정 axios
    ConsoleHelper(`수정버튼`);
    try {
      // await axios.patch(`${process.env.REACT_APP_API_URL}posts/${postId}`);

      // postCreate 페이지로 props.history.push()
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
    // 게시글 삭제 axios
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
      {/* 게시글 본문 */}
      {/* {author && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClickUpdateBtn}>수정</Button>
          <span style={{ width: '20px' }}></span>
          <Button onClick={onClickDeleteBtn}>삭제</Button>
        </div>
      )} */}
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
