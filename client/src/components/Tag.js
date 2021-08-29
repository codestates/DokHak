import React from 'react';
import styled from 'styled-components';

const StyledTag = styled.label`
  padding: 5px 20px;
  border-radius: 10px;
  letter-spacing: 0.05em;
  text-decoration: none;
  font-size: 0.5rem;
  transition: all 1s;
  background: #37373e;
  color: #fff;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
`;

const Tag = ({ children }) => {
  return (
    <>
      <StyledTag>{children}</StyledTag>
    </>
  );
};

export default Tag;
