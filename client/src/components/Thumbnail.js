import React from 'react';
import styled from 'styled-components';

const FigureWrapper = styled.div`
  margin-bottom: 10px;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;

    flex: 1 1 40%;
  }
`;

const Figure = styled.figure`
  height: 100px;
  margin: 1rem 0;

  border-radius: 5px;
  overflow: hidden;
  opacity: 0.5;
  border-radius: 5px;

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

const Thumbnail = ({ idx, src, selectedThumbnail, setSelectedThumbnail }) => {
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
};

export default Thumbnail;
