import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  ${({ big }) => (big ? 'width: 100%;' : 'width: 100px;')}
  height: 35px;
  background-color: #37373e;
  border-radius: 5px;
  transition: all 0.3s ease 0s, width 0s;
  outline: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border: none;
  letter-spacing: 2.5px;
  font-size: 1rem;
  color: #fff;
  margin: 10px 0;

  &:hover {
    background-color: #ffc700;
    cursor: pointer;
    box-shadow: 5px 12px 9px 1px rgba(55, 55, 62, 0.29);
    color: #fff;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(1);
    box-shadow: none;
    outline: 0;
  }

  @media (max-width: 768px) {
    justify-content: center;
    flex: 1 1 100%;
    height: 35px;
    line-height: 33px;
  }
`;

const Button = ({ children, big, onClick }) => {
  return (
    <>
      <StyledButton big={big} onClick={onClick}>
        {children}
      </StyledButton>
    </>
  );
};

export default Button;
