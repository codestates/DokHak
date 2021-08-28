const { Post, User, Stack } = require('../models');
const post = require('../models/post');
const db = require('../models');
// console.log(db.sequelize.models.post_stack)

module.exports = {
  createPost: async (req, res) => {
    try{
      const { email, password } = req.headers;
      const user = await User.findOne({
        where: {
          email,
          password,
        }
      });
      
      // console.log(user)

      if (!user) {
        res.status(401).send({ message: "Unauthorized Request" });
      } else {
        const { stackId, image, title, content, username } = req.body;
        
        const post = await Post.create({  
          image,
          title,
          content,
          username: user.name,
          userId: user.id  // 따로 연결을 시켜줘야 함.
        });
        
        await stackId.map((el) => {
          db.sequelize.models.post_stack.bulkCreate([{
            PostId: post.id,
            StackId: el,
          }])
        })

        await db.sequelize.models.Comment.create({
          userId: user.id,
          postId: post.id,
        });
        
      res.status(200).send({ message: "ok" });
      }
    } catch (error) {
      res.status(500).send({ message: "Server Error" });
    };
  },
  getAllPosts: async (req, res) => {  
    // post의 개수만큼 for문을 돌려야 한다.
    // PostId를 가지고 StackId를 구한다. [1, 3, 5] => 배열안에 넣어야 하는데 어떻게 넣어야할지 모르겠음.
    // Post.findAll하여 post값과 stackId의 값을 같이 보낸다.

    // const { PostId } = db.sequelize.models.post_stack
    try {
      let postId = await Post.findAll({  // post.id를 전부 찾아 for문을 돌린다.
        attributes: [ 'id' ],
        raw:true
      });
      // console.log(postId.length)
      let stackObj = {};
      let result = [];
      

      for (let i = 1; i <= postId.length; i++) {
        let stack = await db.sequelize.models.post_stack.findAll({  // SteackId 가져오기... 드디어 성공.
          attributes: [ 'StackId' ],
          where: {
            PostId: i,
          }, 
          raw:true,
        });
        stack = stack.map((el) => el.StackId);
        // console.log(post)

        const post = await Post.findAll({
          attributes: [ 'id', 'image', 'content', 'username' ],
          where: {
            id: i,
          },
          raw: true,
        });
        
        stackObj['stackId'] = stack;
        let newObj = Object.assign(...post, stackObj);
        result.push(newObj);
      };
      // console.log(newObj)
      res.status(201).send({data: result, message: "ok" });
      // console.log(result)
    } catch {
      res.status(500).send({ message : "Server Error" });
    };
  },
  getPostsById: async (req, res) => {
    // 특정 게시글 조회(게시글 카드 클릭 시) => 클릭 시 post.id가 전송됨
    // console.log(req.params.id)
    
    // 본인인지 확인만 넣으면 됨

    try {
      const getPostId = req.params.id;

      const { email, password } = req.headers;
      const user = await User.findOne({
        where: {
          email,
          password,
        }
      });
      
      let com = await db.sequelize.models.Comment.findOne({
        attributes: ["PostId"],
        where: {
          UserId: user.id,
          PostId: getPostId
        }
      })

      let author = {};
      com ? author["author"] = true : author["author"] = false ;  // 유저인지 아닌지.
      console.log(author)
      // console.log(user.id)
      
      let post = await Post.findOne({
        attributes: [ 'id', 'image', 'content', 'username' ],
        where: {
          id: getPostId,
        },
        raw: true,
      });
      // console.log(post)
      
      

      
      let stack = await db.sequelize.models.post_stack.findAll({  // SteackId 가져오기... 드디어 성공.
        attributes: [ 'StackId' ],
        where: {
          PostId: getPostId,
        }, 
        raw:true,
      });
      // console.log(stack)
      let stackObj = {};
      stack = stack.map((el) => el.StackId);
      stackObj['stackId'] = stack;
      let newObj = Object.assign(post, stackObj, author);
      
      res.status(200).send({ data: newObj, messgae: "ok" });
    } catch (error) {
      res.status(500).send({ message : "Server Error" });
    };

  },
  getPostsByStackId: async (req, res) => {
    // console.log(req.params)
    try {
      const par = req.params.id

      let postid = await db.sequelize.models.post_stack.findAll({  // postid를 가져옴.
        attributes: [ 'PostId' ],
        where: {
          StackId: par,
        }, 
        raw:true,
      })
      
      postid = postid.map((el) => el.PostId);
      // console.log(postid[0],postid[2])

      let stackObj = {};
      let result = [];

      for (let i = 0; i < postid.length; i++) {
        const post = await Post.findAll({
          attributes: [ 'id', 'image', 'content', 'username' ],
          where: {
            id: postid[i],
          },
          raw: true,
        });
        // console.log(post)

        let stack = await db.sequelize.models.post_stack.findAll({ 
          attributes: [ 'StackId' ],
          where: {
            PostId: postid[i],
          }, 
          raw:true,
        });
        stack = stack.map((el) => el.StackId);
        stackObj['stackId'] = stack;
        let newObj = Object.assign(...post, stackObj);
        result.push(newObj);
      }
      console.log(result)
      res.status(200).send({ data: result , messgae: "ok" });
    } catch (error) {
      res.status(500).send({ message : "Server Error" });
    }

    // await postid.map((el) => {
    //   const post = await Post.findAll({
    //     attributes: [ 'id', 'image', 'content', 'username' ],
    //     where: {
    //       id: el,
    //     },
    //     raw: true,
    //   });

    //   let stack = await db.sequelize.models.post_stack.findAll({  // SteackId 가져오기... 드디어 성공.
    //     attributes: [ 'StackId' ],
    //     where: {
    //       PostId: el,
    //     }, 
    //     raw:true,
    //   });

    // })


  },
  updatePost: async (req, res) => {
    // 일단 본인인지 확인을 해야된다.
    // 확인 과정.
    // 1. 받아온 토큰을 해독해서 user의 정보를 가져온다. (comment로 userId와 PostId가 맞는 지 확인)
    // 2. post를 눌렀을 때 수정할 수 있도록 해야된다. (수정을 눌렀음.)
    
    // Post.update({
    //   title: '수정 내용'
    //   comment: '수정 내용'
    // }, {
    //   where: { id: 1}
    // });
    try {
      const { email, password } = req.headers;
      const par = req.params;
      // console.log(par)

      const user = await User.findOne({
        where: {
          email,
          password,
        }
      });
      // console.log(user.id)
      const ok = await db.sequelize.models.Comment.findOne({
        where: {
          userId: user.id,
          postId: par.id,
        }
      })
      // console.log(ok)
      // console.log(req.params)
      // console.log(db.sequelize.models.Comment)
      if (!ok) {
        res.status(401).send({ message: "Unauthorized Request" });
      } else {
        const { stackId, image, title, content } = req.body;

        await Post.update(  // Post 수정 ok.
          { image , title , content },
          { where: {
              id: par.id
            }
          });

        // Stack 수정 남음
        // console.log(stackId)

        await db.sequelize.models.post_stack.destroy({  // 삭제하고 
          where: {
            PostId: par.id
          }
        })

        await stackId.map((el) => {
          db.sequelize.models.post_stack.bulkCreate([{  // 다시 받는다.. 일단 이렇게.
            PostId: par.id,
            StackId: el,
          }])
        })
      }
      res.status(200).send({ message: "ok" });
    } catch (error) {
      res.status(500).send({ message: "Server Error" });
    }
  },
  deletePost: async (req, res) => {
    
    try {
      const { email, password } = req.headers;
      const par = req.params;
      // console.log(par)

      const user = await User.findOne({
        where: {
          email,
          password,
        }
      });

      if (!user) {
        res.status(401).send({ message: "Unauthorized Request" });
      } else {
        await Post.destroy({  // 삭제하고 
          where: {
            id: par.id
          }
        })
        await db.sequelize.models.post_stack.destroy({  // 삭제하고 
          where: {
            PostId: par.id
          }
        })
        res.status(200).send({ message: "ok" });
      }
    } catch (error) {
      res.status(500).send({ message: "Server Error" });
    }
  },
};

  //-----------------------------------------------------------------------------------------
  // const { image, email, name, password, phone, info } = req.body;  // 유저만들기
  // await User.create({
  //   image:image,
  //   email:email,
  //   name:name,
  //   password: password,
  //   phone:phone,
  //   info:info,
  // });
  // res.status(201).send({ message: "ok" });
  //-----------------------------------------------------------------------------------------
  // const newObj = [ 'React', 'Vue.js', 'Angular', 'Node.js', 'Django', 'Spring', 'Flutter', 'React Native' ];  // stack만들기
  // for (let i = 0; i < newObj.length; i++) {
  //   await Stack.create({ 
  //       name: newObj[i],
  //     })
  // }
  //-----------------------------------------------------------------------------------------
  // 선택한 stack의 id들을 array로 넘기고,
  // server쪽에서 post_stack 테이블 record 생성

  // user의 stack([1, 3])의 id?를 post_stack 테이블에 생성 X
  // 선택할 수 있는 버튼. 선택한 stack의 id를 array(배열)로 받아 post_stack에 생성

  // req.body에 체크한 stack이 있을 것임.
  // 체크한 stack의 id를 가지고 배열에 넣고
  // post_stack에 추가한다.
  //-----------------------------------------------------------------------------------------

