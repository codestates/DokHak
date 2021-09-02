import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 70px 0 150px;

  &.card-page {
    width: 80%;
  }
`;

export const CardFlexBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  grid-gap: 1rem;
  justify-content: space-around;
  width: 100%;

  @media (min-width: 769px) and (max-width: 1200px) {
    justify-content: space-around;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
