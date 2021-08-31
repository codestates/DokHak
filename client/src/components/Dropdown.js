import React from 'react';
import { Link } from 'react-router-dom';

import './dropdown.scss';
// import { Link } from './Navbar';

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

const Dropdown = ({ children, name }) => {
  return (
    <>
      <div className="dropdown">
        <Link className="dropbtn" style={{ paddingLeft: '0' }}>
          {children}
        </Link>
        <ul className="dropdown-content">
          {stacks.map((li, idx) => (
            <Link key={li} to={`/${name}/${idx}`}>
              <li>{li}</li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
