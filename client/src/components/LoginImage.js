import React, { memo } from 'react';
import styled from 'styled-components';
import { images } from '../data';

import ConsoleHelper from '../ConsoleHelper.js';

const FigureWrapper = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
`;

const Figure = styled.figure`
  width: 100%;
  height: 100%;

  border-radius: 50%;
  overflow: hidden;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoginImage = memo(({ imageId }) => {
  return (
    <>
      <FigureWrapper>
        <Figure>
          <ThumbnailImage src={images[imageId]} alt={imageId} />
        </Figure>
      </FigureWrapper>
    </>
  );
});

export default LoginImage;
