import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

import { Main } from './styles';
import { thumbnails } from '../data';
import Thumbnail from '../components/Thumbnail';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

const FlexBoxSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TitleInput = styled.input`
  flex-grow: 1;
  margin-right: 1.5rem;
  border: none;
  outline: none;
  font-size: 1.5rem;
  width: 100%;
  border-bottom: 1px solid #000;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const PostButtonWrapper = ({ className, children }) => (
  <div className={className}>
    <Button>{children}</Button>
  </div>
);

const PostButton = styled(PostButtonWrapper)`
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    margin-bottom: 30px;

    * {
      width: 100%;
      margin: 0;
    }
  }
`;

const PostCreate = () => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(1);
  const [value, setValue] = useState('Type here...');

  const onClickThumbnail = useCallback((idx) => {
    setSelectedThumbnail(idx);
  }, []);

  return (
    <Main>
      {/* map으로 Thumbnail */}
      {/* Checkbox Component */}
      {/* SmallButton Component */}
      {/* Editor Component */}
      <h3>Thumbnail</h3>
      <FlexBoxSpaceBetween style={{ columnGap: '1rem' }}>
        {thumbnails.map((src, idx) => (
          <Thumbnail
            key={src}
            idx={idx}
            src={src}
            selectedThumbnail={selectedThumbnail}
            setSelectedThumbnail={onClickThumbnail}
          />
        ))}
      </FlexBoxSpaceBetween>

      <FlexBoxSpaceBetween>
        <TitleInput placeholder="Title" />
        <PostButton>확인</PostButton>
      </FlexBoxSpaceBetween>

      <Checkbox />

      <MDEditor value={value} onChange={setValue} height={400} />
    </Main>
  );
};

export default PostCreate;
