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
        <div className="dropbtn" style={{ paddingLeft: '0' }}>
          {children}
        </div>
        <ul className="dropdown-content">
          {stacks.map((li, idx) => (
            <Link key={li} to={`/${name}/stacks/${idx + 1}`}>
              <li>{li}</li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
