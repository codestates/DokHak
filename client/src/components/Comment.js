import React, { useState } from 'react';
import Button from './Button';

import './comment.scss';

const comments = [
  { username: '김코딩', content: '안년아아아아아아아아아' },
  { username: '김코딩', content: '안년아아아아아아아아아222' },
  { username: '박코딩', content: '안년아아아아ㅇㄴㅇㄹ2' },
  { username: '최코딩', content: '안년아아ㄴㅇㄹ아아아아아아아222' },
  { username: '이코딩', content: '안년아아아아아ㄴㅇㄹ아아아아222' },
];

const Comment = () => {
  return (
    <>
      <div className="header">
        <div className="container">
          <h2>댓글</h2>
        </div>
      </div>

      <div className="main">
        <div className="container">
          <div className="form">
            <div className="textarea-wrapper">
              <textarea id="comment" type="text" rows="4" />
            </div>
            <Button type="button" className="btn">
              작성
            </Button>
          </div>

          <ul className="comments">
            {comments.map((comment, idx) => (
              <li key={`${comment}${idx}`}>
                <div className="author">{comment.username}</div>
                <div>{comment.content}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Comment;
