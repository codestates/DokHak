import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

import { GoTriangleDown } from 'react-icons/go';

import Card from '../components/Card';
import Dropdown from '../components/Dropdown.js';
import { Main, CardFlexBox } from './styles.js';

import ConsoleHelper from '../ConsoleHelper.js';

// 임시 포스트 데이터
const postsD = [
  {
    name: '랄랄라',
    image: 0,
    info: '충분히 사는가 보내는 대한 피다. 바이며, 그들의 되는 열매를 물방아 스며들어 뜨고, 길을 힘있다. 청춘의 같은 있으며, 우리 산야에 못하다 운다.',
  },
  {
    name: '박준호',
    image: 1,
    info: '날카로우나 창공에 피는 그러므로 영락과 청춘을 뿐이다. 그러므로 있는 설레는 가진 밥을 산야에 이것이다. 아니더면, 없는 없으면 모래뿐일 곧 청춘 쓸쓸하랴? 생의 듣기만 반짝이는 남는 일월과 할지니, 자신과 피다.',
  },
  {
    name: '백승문',
    image: 2,
    info: '얼마나 그들의 싸인 것은 이상 평화스러운 간에 끓는다. 불어 같은 그들의 살았으며, 옷을 같은 때문이다.',
  },
  {
    name: '정선아',
    image: 3,
    info: '가슴에 지혜는 오직 우리는 몸이 넣는 동산에는 동력은 이상은 피다. 노래하며 인생에 평화스러운 위하여서 피는 있는 것이다. 있을 없으면 가는 위하여 긴지라 귀는 찾아 심장은 것이 끓는다. 능히 곧 청춘의 품었기 시들어 고동을 그들은 철환하였는가?',
  },
  {
    name: '정선아2',
    image: 3,
    info: '가슴에 지혜는 오직 우리는 몸이 넣는 동산에는 동력은 이상은 피다. 노래하며 인생에 평화스러운 위하여서 피는 있는 것이다. 있을 없으면 가는 위하여 긴지라 귀는 찾아 심장은 것이 끓는다. 능히 곧 청춘의 품었기 시들어 고동을 그들은 철환하였는가?',
  },
  {
    name: '백승문2',
    image: 2,
    info: '얼마나 그들의 싸인 것은 이상 평화스러운 간에 끓는다. 불어 같은 그들의 살았으며, 옷을 같은 때문이다.',
  },
  {
    name: '박준호2',
    image: 1,
    info: '날카로우나 창공에 피는 그러므로 영락과 청춘을 뿐이다. 그러므로 있는 설레는 가진 밥을 산야에 이것이다. 아니더면, 없는 없으면 모래뿐일 곧 청춘 쓸쓸하랴? 생의 듣기만 반짝이는 남는 일월과 할지니, 자신과 피다.',
  },
  {
    name: '김민성2',
    image: 0,
    info: '충분히 사는가 보내는 대한 피다. 바이며, 그들의 되는 열매를 물방아 스며들어 뜨고, 길을 힘있다. 청춘의 같은 있으며, 우리 산야에 못하다 운다.',
  },
];

const Post = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      if (props.match.params?.id) {
        if (!props.match.url.includes('stacks')) {
          const postList = await axios.get(
            `${process.env.REACT_APP_API_URL}/posts/${props.match.params.id}`
          );
          setPosts(postList.data.data);
          ConsoleHelper(postList.data.data);
        } else {
          const postList = await axios.get(
            `${process.env.REACT_APP_API_URL}/posts/stacks/${props.match.params.id}`
          );
          ConsoleHelper(props.match.params.id);
          setPosts(postList.data.data);
          ConsoleHelper(postList.data.data);
        }
      } else {
        const postList = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts`
        );
        setPosts(postList.data.data);
      }
    } catch (err) {
      ConsoleHelper(err);
    }
  }, [props.match.params]);

  return (
    <>
      <Dropdown name="posts">
        <span>기술스택</span>
        <GoTriangleDown />
      </Dropdown>
      <Main className="card-page" style={{ marginTop: '46px' }}>
        <CardFlexBox>
          {posts.map((post, idx) => (
            <Link key={`${post.title}${idx}`} to={`/posts/${post.id}`}>
              <Card data={post} post />
            </Link>
          ))}
        </CardFlexBox>
      </Main>
    </>
  );
};

export default Post;
