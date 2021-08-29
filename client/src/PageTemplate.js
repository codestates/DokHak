import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/Navbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  min-width: 512px;
  width: 80%;
`;

const PageTemplate = ({ children }) => {
  return (
    <>
      <Container>
        <Router>
          <Navbar></Navbar>
        </Router>
        {children}
      </Container>
    </>
  );
};

export default PageTemplate;
