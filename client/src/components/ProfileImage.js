import React, { memo } from 'react';
import styled from 'styled-components';

const FigureWrapper = styled.div`
  display: flex;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`;

const Figure = styled.figure`
  width: 100%;
  height: 100%;

  border-radius: 50%;
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
  object-fit: cover;

  transform: scale(1);
  transition: 0.3s ease-in-out;
  -webkit-transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.3);
    -webkit-transform: scale(1.3);
  }
`;

const ProfileImage = memo(
  ({ idx, src, selectedThumbnail, setSelectedThumbnail }) => {
    return (
      <>
        <FigureWrapper>
          <Figure
            onClick={() => setSelectedThumbnail(idx)}
            selected={idx === selectedThumbnail}
          >
            <ThumbnailImage src={src} alt={src} />
          </Figure>
        </FigureWrapper>
      </>
    );
  }
);

export default ProfileImage;
