import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';
import './usermodal.scss';

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

const UserModal = () => {
  return (
    // <div className="card-wrapper">
    <div className="card">
      <header>
        <div className="header-top"></div>
        <div className="avatar-holder">
          <img
            src="https://images.unsplash.com/photo-1463436755683-3f805a9d1192?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80"
            alt="Albert Einstein"
          />
        </div>
        <div className="name">김코딩</div>
        <TagWrapper>
          {stacks.map((stack, idx) => (
            <Tag key={idx}>{stack}</Tag>
          ))}
        </TagWrapper>
      </header>
      <section className="detail">
        <div className="detail-items">
          <h6 className="label">
            <i className="fas fa-mobile"></i> Mobile{' '}
          </h6>
          <p>010-3323-2110</p>
        </div>
        <div className="detail-items">
          <h6 className="label">
            <i className="fas fa-envelope"></i> Email{' '}
          </h6>
          <p>kimcoding@github.com</p>
        </div>
        <div className="detail-items">
          <h6 className="label">
            <i className="fas fa-info-circle"></i> Information{' '}
          </h6>
          <p className="info">{`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio illo quasi provident
          eligendi consequuntur esse fugiat possimus corrupti! Dicta voluptatum illum neque. Inventore voluptatibus
          consequatur maiores libero dicta atque dignissimos omnis saepe sint, nemo voluptas autem earum incidunt
          quisquam quia, iste sunt adipisci quo veniam reprehenderit magni assumenda molestias perspiciatis totam. Nemo
          dolorum unde corporis delectus. Tempora quaerat incidunt ratione expedita optio? Maxime explicabo eos soluta,
          provident dignissimos sit facilis, consectetur ipsum ex laboriosam obcaecati quaerat saepe! Neque praesentium
          sed iusto adipisci numquam, rerum voluptatum odit obcaecati consequatur vero excepturi quisquam asperiores
          architecto in aperiam quaerat itaque molestias vel quia non optio autem. Temporibus, similique recusandae
          inventore deserunt quo ullam doloribus voluptate quam adipisci animi laborum veniam perferendis? Sed, corrupti
          maiores necessitatibus repudiandae nisi dolores, obcaecati qui eligendi distinctio tenetur laborum. Nam natus
          aperiam delectus dolores cumque a debitis culpa aliquid magnam fugit eligendi, consectetur unde praesentium!
          Incidunt nemo blanditiis adipisci nisi rerum consectetur assumenda dicta recusandae corporis in! Iure
          distinctio adipisci, ipsum unde tempora, quae veritatis nam ipsa eos totam perspiciatis, maxime velit rem
          dolorum eius similique? Ullam quisquam consequuntur harum? Nostrum adipisci alias nihil minima amet quia
          laboriosam, libero magnam delectus, totam earum dolore ut, aut unde neque veritatis! Quidem quod reprehenderit
          culpa debitis! Incidunt voluptas, qui nisi commodi fugit tenetur libero hic tempore nihil esse excepturi.
          Quisquam ab animi recusandae perspiciatis optio voluptatibus, vel expedita quo dolore totam fugit ducimus qui
          quidem, necessitatibus officia quae asperiores nesciunt eligendi perferendis. Cum eum tenetur minus, esse
          aliquam maiores, dignissimos autem labore velit perspiciatis aut ea laborum quas quod ipsam a fuga nihil
          tempore! Fugit et molestiae iste veritatis odit delectus porro pariatur doloremque corporis exercitationem
          alias dolorem voluptatem magni voluptatibus non fuga corrupti maiores officiis, a excepturi, laudantium
          repellendus quos? Impedit debitis deserunt enim fugiat. Itaque necessitatibus illo nisi.`}</p>
        </div>
      </section>
    </div>
    // </div>
  );
};

export default UserModal;
