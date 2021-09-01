const { Post, User, Stack, Comment } = require('../models');
const db = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  addComment: async (req, res) => {
    try {
      const { content } = req.body;
      // console.log(content)

      const post = await Post.findOne({
        // post.id를 구해
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      // console.log(post)

      console.log('여긴 통과');

      const user = await User.findOne({
        attributes: ['name'],
        where: {
          id: req.userId,
        },
        raw: true,
      });

      console.log(user);
      // console.log(user.name)

      const comment = await Comment.create({
        // post.id와 user.id를 비교해 맞으면 comment를 만든다.
        content: content,
        username: user.name,
        userId: req.userId,
        postId: post.id,
      });

      return res.status(200).send({ data: comment, message: 'ok' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Server Error' });
    }
  },
  getCommentsByPostId: async (req, res) => {  
    const param = req.params
    // console.log(param.id)
    
    const comment = await Comment.findAll({
      attributes: [ "username", "content" ],
      where: {
        postId: param.id
      },
      raw: true
    })
    
    const getUserId = await Comment.findAll({
      attributes: [ "userId" ],
      where: {
        postId: param.id,
      },
      raw: true
    })

    let result = [];
    let author = {};
    
    try {
      const token = req.cookies['jwt'];
      if (!token) {
        for (let i = 0; i < getUserId.length; i++){
          author['author'] = false;
          let newObj = Object.assign(comment[i], author);
          result.push(newObj)
        }
        return res.status(200).send({ data: result, message: "OK" });
      }
      
      jwt.verify(token, process.env.JWT_SECRETKEY, async (err, encoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized Request' });
        }
        const userInfo = await User.findOne({ where: { id: encoded.id } });
        if (!userInfo) {
          return res.status(401).json({ message: 'Unauthorized Request' });
        }
        req.userId = encoded.id;
        
        for (let i = 0; i < getUserId.length; i++){
          if (getUserId[i].userId !== req.userId) {
          author['author'] = false;
          let newObj = Object.assign(comment[i], author);
          result.push(newObj)
        } else {
          author['author'] = true;
          let newObj = Object.assign(comment[i], author);
          result.push(newObj)
        }
      }
      return res.status(200).send({ data: result, message: "OK" });
    });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  updateComment: async (req, res) => {
    try {
      const userId = req.userId;
      const { content } = req.body;
      const param = req.params.id;

      const comment = await Comment.findOne({
        attributes: ['content'],
        where: {
          userId,
        },
        raw: true,
      });

      const updateContent = await Comment.update(
        // Post 수정
        { content },
        {
          where: {
            id: param,
            userId: req.userId,
          },
        }
      );

      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: "Server Error" });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;

      await Comment.destroy({
        where: {
          id,
          userId: req.userId
        }
      })
      
      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: "Server Error" });
    }
  },
};
