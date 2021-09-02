import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

import styled from 'styled-components';
import { GoTriangleDown } from 'react-icons/go';

import Card from '../components/Card';
import Dropdown from '../components/Dropdown.js';
import UserModal from '../components/UserModal.js';
import { Main, CardFlexBox } from './styles.js';

import ConsoleHelper from '../ConsoleHelper.js';

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

const User = (props) => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentUserIdx, setCurrentUserIdx] = useState(-1);

  useEffect(async () => {
    ConsoleHelper('여기일ㄴㅇ라니알니알ㄴ이');
    ConsoleHelper(props.match.params);
    try {
      if (props.match.params?.id) {
        const userList = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/stacks/${props.match.params.id}`
        );
        setUsers(userList.data.data);
        ConsoleHelper(userList.data.data);
      } else {
        const userList = await axios.get(
          `${process.env.REACT_APP_API_URL}/users`
        );
        setUsers(userList.data.data);
      }
    } catch (err) {
      ConsoleHelper(err);
    }
  }, [props.match.params]);

  const toggleModal = useCallback(() => {
    setModal((modal) => !modal);
  }, []);

  const onClickUserCard = useCallback(
    (idx) => () => {
      setCurrentUserIdx(idx);
      setModal((modal) => !modal);
    },
    []
  );

  return (
    <>
      <Dropdown name="users">
        <span>기술스택</span>
        <GoTriangleDown />
      </Dropdown>
      <Main className="card-page" style={{ marginTop: '46px' }}>
        <CardFlexBox>
          {users.map((user, idx) => (
            <Card key={user.name} data={user} onClick={onClickUserCard(idx)} />
          ))}
        </CardFlexBox>

        {modal && (
          <Container style={{ zIndex: '999' }}>
            <Overlay onClick={toggleModal} />
            <UserModal user={currentUserIdx !== -1 && users[currentUserIdx]} />
          </Container>
        )}
      </Main>
    </>
  );
};

export default User;
