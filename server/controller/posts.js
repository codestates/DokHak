const { Post, User, Stack } = require('../models');
const post = require('../models/post');
const db = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  createPost: async (req, res) => {
    try {
      const { stackId, image, title, content } = req.body;
      const userId = req.userId
      const name = await User.findOne({  // 유저 이름 찾기
        attributes: [ "name" ],
        where: {
          id: userId
        },
        raw: true,
      })
      
      const post = await Post.create({  // post 생성
        image,
        title,
        content,
        username: name.name,
        userId  
      });
      
      await stackId.map((el) => {  // post에 대한 stackId 생성
        db.sequelize.models.post_stack.bulkCreate([{
          PostId: post.id,
          StackId: el,
        }])
      })
        
      return res.status(200).json({ data: { postId: post.id}, message: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getAllPosts: async (req, res) => {  

    const post = await Post.findAll({
      attributes: [ 'id', 'image', 'title','content', 'username' ],
      raw: true,
    });

    const postsWithStacks = [];
    for (let i = 0; i < post.length; i++) {
      const stackObj = {};
      let stacks = await db.sequelize.models.post_stack.findAll({
        attributes: ['StackId'],
        where: { PostId: post[i].id },
        raw: true,
      });
      stacks = stacks.map((stack) => stack.StackId);  // [1, 3, 5]

      stackObj['stacks'] = stacks;  // "stacks" = [1, 3, 5]
      postsWithStacks.push(Object.assign(post[i], stackObj));
    }
    try {
      if (postsWithStacks) {
        return res.status(200).json({ data: postsWithStacks, message: 'OK' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  getPostsById: async (req, res) => {
    // try {
      const getPostId = req.params.id; 
      const postId = await Post.findOne({  // post.id를 찾는데
        attributes: [ "id", "image", "title", "content", "username" ], 
        where: {
          id: getPostId
        },
        raw: true
      })
      
      let author = { "author": false };
      
      console.log(post)
      
      try {
      const token = req.cookies['jwt'];
      
      jwt.verify(token, process.env.JWT_SECRETKEY, async (err, encoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized Request' });
        }
        const userInfo = await User.findOne({ where: { id: encoded.id } });
        if (!userInfo) {
          return res.status(401).json({ message: 'Unauthorized Request' });
        }
        req.userId = encoded.id;
      }); 

      const postUserId = await Post.findOne({  // post.id를 찾는데
        attributes: [ "userId" ], 
        where: {
          id: getPostId
        },
        raw: true
      });

      if (postUserId.userId !== req.userId) {
        // console.log(postUserId)
        author["author"] = false;
        let post = Object.assign(postId, author)
        return res.status(200).json({ data: post, message: 'OK' });
      }
      

      const userInfo = await User.findOne({ where: { id: req.userId } });
      // console.log (userInfo)
      author["author"] = true
      let post = Object.assign(postId, author)

      return res.status(200).json({ data: post, message: 'OK' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getPostsByStackId: async (req, res) => {
    try {
      const param = req.params.id
     
      let postid = await db.sequelize.models.post_stack.findAll({  // 받은 params.id에 포함된 post.id를 찾는다.
        attributes: [ 'PostId' ],
        where: {
          StackId: param,
        }, 
        raw:true,
      })
      
      postid = postid.map((el) => el.PostId);  // 배열로 만든다. => [1, 3, 5]

      let stackObj = {};
      let result = [];

      for (let i = 0; i < postid.length; i++) {
        const post = await Post.findAll({  // 해당하는 post를 찾아
          attributes: [ 'id', 'image', 'title', 'content', 'username' ],
          where: {
            id: postid[i],
          },
          raw: true,
        });

        let stack = await db.sequelize.models.post_stack.findAll({  // stackId도. 
          attributes: [ 'StackId' ],
          where: {
            PostId: postid[i],
          }, 
          raw:true,
        });
        stack = stack.map((el) => el.StackId);
        stackObj['stackId'] = stack;  // '{stackId = [1, 2, 3]}'
        let newObj = Object.assign(...post, stackObj);  // 하나로 묶는다.
        result.push(newObj);
      }
      return res.status(200).json({ data: result , messgae: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message : "Server Error" });
    }
  },
  updatePost: async (req, res) => {
    try {
      const param = req.params.id;
      // console.log(req.userId)
     
      const { stackId, image, title, content } = req.body;
      let stackObj = {};
      stackObj['stackId'] = stackId;
      
      const a = await Post.update(  // Post 수정
        { image , title , content },
        { where: {
          id: param,
          userId: req.userId,
        }
      });
      
      await db.sequelize.models.post_stack.destroy({  // stackId를 삭제하고 
        where: {
          PostId: param,
        }
      })
      
      await stackId.map((el) => {
        db.sequelize.models.post_stack.bulkCreate([{  // 다시 만든다.
          PostId: param,
          StackId: el,
        }])
      })
      
      const post = await Post.findOne({  // update한 post를 찾아
        attributes: [ 'id', 'image', 'title' ,'content', 'username' ],
        where: {
          id: param,
          userId: req.userId,
        },
        raw: true,
      })
      
      const updatePost = Object.assign(post, stackObj);  // 하나로 묶음.
      
      return res.status(200).json({ data: updatePost, message: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  deletePost: async (req, res) => {
    try {  
      const { id } = req.params;

      await Post.destroy({  
        where: {
          id,
          userId: req.userId
        }
      })
      
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};