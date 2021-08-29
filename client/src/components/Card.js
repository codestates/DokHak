import React from 'react';
import styled from 'styled-components';

import { images, thumbnails } from '../data';

const CardContainer = styled.section`
  max-width: 320px;
  height: 380px;
  display: flex;
  justify-content: center;
  flex: 1 1 20%;
  max-width: 250px;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex: 1 1 100%;
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    justify-content: space-between;
    flex: 1 1 40%;
  }
`;

const CardImgArea = styled.div`
  visibility: hidden;
  width: 100%;
  height: 60%;
`;

const CardImgHover = styled.div`
  background-image: ${({ image, post }) =>
    post ? `url(${thumbnails[image]})` : `url(${images[image]})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 60%;
  position: absolute;
  top: 0;

  transition: 0.2s all ease-out;
  -webkit-transition: 0.2s all ease-out;
`;

const CardSection = styled.article`
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  -webkit-transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 4px 20px 4px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    z-index: 2;
    box-shadow: 0px 4px 20px 4px rgba(0, 0, 0, 0.12);
    transform: scale(1.05, 1.05);

    ${CardImgHover} {
      height: 100%;
      opacity: 0.3;
    }
  }
`;

const CardInfo = styled.div`
  background-color: #fff;
  padding-top: 10px;
  margin: 20px;
  height: 40%;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardAuthor = styled.h3`
  margin: 10px 0;
  font-size: 1rem;
  font-weight: 700;
`;

const CardContent = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.25rem;
`;

const Card = ({ data, post, onClick }) => {
  return (
    <CardContainer key={data.name} onClick={onClick}>
      <CardSection>
        <CardImgArea />
        <CardImgHover image={data.image} post={post} />
        <CardInfo>
          <CardAuthor>{data.name}</CardAuthor>
          <CardContent>{data.info}</CardContent>
        </CardInfo>
      </CardSection>
    </CardContainer>
  );
};

export default Card;
