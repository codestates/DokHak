import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color } from '../Theme';

const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 70px;

  &:after {
    content: '';
    border-bottom: 1px solid ${color.black};
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: ${color.primary};
    margin-bottom: 6px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuLink = styled(Link)`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: ${color.primary};
  transition: all 0.3s ease-in;
  font-size: 1rem;

  &:hover {
    color: ${color.white};
  }

  &:last-child {
    padding-right: 0;

    @media (max-width: 768px) {
      padding-right: 2rem;
      transition: none;
    }
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    transition: max-height 0.2s ease-out;
  }
`;

const Logo = styled(Link)`
  padding: 1rem 0;
  color: ${color.primary};
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  transition: all 0.3s ease-in;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }

  &:hover {
    color: ${color.white};
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      {/* Login -> 이미지 / Logout -> 로그인 */}
      {/*  Header에서 hover 시 -> Dropdown */}
      <Logo to="/">DokHak</Logo>
      <Hamburger onClick={toggle}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      {/* 만약 링크들이 하나라도 클릭이되면 모달이 닫혀야한다.  */}
      <Menu isOpen={isOpen}>
        <MenuLink onClick={toggle}>기술스택</MenuLink>
        <MenuLink to="/user" onClick={toggle}>
          유저
        </MenuLink>
        <MenuLink to="/post" onClick={toggle}>
          포스트
        </MenuLink>
        <MenuLink to="/login" onClick={toggle}>
          로그인
        </MenuLink>
      </Menu>
    </Nav>
  );
}

export default Navbar;
