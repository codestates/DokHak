import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';
import './usermodal.scss';
import { images } from '../data';

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

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 0.5rem;
  margin-top: 5px;
  margin-bottom: 40px;
`;

const UserModal = ({ user }) => {
  console.log('durldfsdfsdfsdf', user);
  return (
    <div className="card-wrapper">
      <div className="card">
        <header>
          <div className="header-top"></div>
          <div className="avatar-holder">
            <img src={images[user.image]} alt={`${user.name} image`} />
          </div>
          <div className="name">{user.name}</div>
          <TagWrapper>
            {user.stacks.length !== 0 &&
              user.stacks.map((stack, idx) => (
                <Tag key={idx}>{stacks[stack - 1]}</Tag>
              ))}
          </TagWrapper>
        </header>
        <section className="detail">
          <div className="detail-items">
            <h6 className="label">
              <i className="fas fa-mobile"></i> Mobile
            </h6>
            <p>{user.phone}</p>
          </div>
          <div className="detail-items">
            <h6 className="label">
              <i className="fas fa-envelope"></i> Email
            </h6>
            <p>{user.email}</p>
          </div>
          <div className="detail-items">
            <h6 className="label">
              <i className="fas fa-info-circle"></i> Information
            </h6>
            <p className="info">{user.info}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserModal;
