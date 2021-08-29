import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Main, CardFlexBox } from './styles.js';
import Card from '../components/Card';
import Dropdown from '../components/Dropdown.js';
import UserModal from '../components/UserModal.js';

// 임시 유저 데이터
const users = [
  {
    name: '김민성',
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

const ModalButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: #37373e;
  color: white;

  padding: 3px;
  font-weight: 400;
  transition: all 0.2s ease;
  margin: 80px 15px 0 15px;
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 0.5;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const User = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = useCallback(() => setModal(!modal), [modal]);

  return (
    <>
      <Dropdown name="user">
        <span style={{ borderBottom: '1px solid #ddd' }}>기술스택</span>
      </Dropdown>
      <Main className="card-page" style={{ marginTop: '46px' }}>
        <CardFlexBox>
          {users.map((user) => (
            <Card key={user.name} data={user} onClick={toggleModal} />
          ))}
        </CardFlexBox>
        {modal && (
          <Container style={{ zIndex: '999' }}>
            <Overlay onClick={toggleModal} />
            <UserModal />
          </Container>
        )}
      </Main>
    </>
  );
};

export default User;
