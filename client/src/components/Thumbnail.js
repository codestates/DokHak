import React, { memo } from 'react';
import styled from 'styled-components';

const FigureWrapper = styled.div`
  margin-bottom: 10px;
  flex: 1;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const Figure = styled.figure`
  height: 120px;
  margin: 1rem 0;

  border-radius: 5px;
  overflow: hidden;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  &.profile {
    border-radius: 50%;
  }

  ${({ selected }) => {
    return selected ? 'opacity: 1;' : 'opacity: 0.5;';
  }}
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  /* object-fit: cover; */

  transform: scale(1);
  transition: 0.3s ease-in-out;
  -webkit-transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.3);
    -webkit-transform: scale(1.3);
  }
`;

const Thumbnail = memo(({ idx, src, image, onClickImage }) => {
  return (
    <>
      <FigureWrapper>
        <Figure onClick={() => onClickImage(idx)} selected={idx === image}>
          <ThumbnailImage src={src} alt={src} />
        </Figure>
      </FigureWrapper>
    </>
  );
});

export default Thumbnail;
