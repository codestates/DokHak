import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();

import Button from './Button';

import './comment.scss';
import { useSelector } from 'react-redux';

import ConsoleHelper from '../ConsoleHelper.js';

const Comment = ({ postId }) => {
  const user = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  const onChangeComment = (e) => {
    setContent(e.target.value);
  };

  const onClickBtn = async () => {
    if (content === '') return;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/comments/${postId}`, {
        content,
      });

      const commentsServer = await axios.get(
        `${process.env.REACT_APP_API_URL}/comments/${postId}`
      );

      setComments(commentsServer.data.data);
      setContent('');
    } catch (err) {
      ConsoleHelper(err);
    }
  };

  useEffect(async () => {
    const commentsServer = await axios.get(
      `${process.env.REACT_APP_API_URL}/comments/${postId}`
    );

    setComments(commentsServer.data.data);
    ConsoleHelper(commentsServer.data.data);
    ConsoleHelper(comments);
  }, []);

  return (
    <>
      <div className="header">
        <div className="container">
          <h2>댓글</h2>
        </div>
      </div>

      <div className="main">
        <div className="container">
          {user.isLogin && (
            <>
              <div className="form">
                <div className="textarea-wrapper">
                  <textarea
                    id="comment"
                    type="text"
                    rows="4"
                    value={content}
                    onChange={(e) => onChangeComment(e)}
                  />
                </div>
                <Button type="button" className="btn" onClick={onClickBtn}>
                  작성
                </Button>
              </div>
            </>
          )}

          <ul className="comments">
            {comments.map((comment, idx) => (
              <li key={`comment${idx}`}>
                {/* <div className="author">{`comment.username`}</div> */}
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
