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
  display: grid; /* 1 */
  grid-template-columns: repeat(auto-fill, 230px); /* 2 */
  grid-gap: 1rem; /* 3 */
  justify-content: space-around; /* 4 */
  width: 100%;

  @media (min-width: 769px) and (max-width: 1200px) {
    justify-content: space-around;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
