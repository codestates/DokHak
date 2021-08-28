const bcrypt = require('bcrypt');
const { generateAccessToken, sendAccessToken } = require('./tokenFunctions');
const { User } = require('../models');
const db = require('../models');

module.exports = {
  signup: async (req, res) => {
    const { image, email, name, password, phone, info, stacks } = req.body;
    const foundEmail = await User.findOne({ where: { email } });
    const foundName = await User.findOne({ where: { name } });
    if (foundEmail) {
      return res.status(409).json({ message: 'Email exists' });
    } else if (foundName) {
      return res.status(409).json({ message: 'Name exists' });
    }
    {
      try {
        const hashed = await bcrypt.hash(password, 10);
        const userInfo = await User.create({
          image,
          email,
          name,
          password: hashed,
          phone,
          info,
        });
        const userStack = [];
        for (let i = 0; i < stacks.length; i++) {
          // 클라이언트쪽에서 stacks 를 받아오면 for문을 돌려서 새로운 배열에 푸쉬해준다
          userStack.push({
            UserId: userInfo.dataValues.id, // user_stack 의 userId
            StackId: stacks[i], // user_stack 의 StackId
          });
        }
        console.log(userStack);
        await db.sequelize.models.user_stack.bulkCreate(userStack); // bulkCreate 인자는 배열이돼야한다. 여러가지 옵션을 추가할수있지만 쓸만한건 안보임
        const token = generateAccessToken({ id: userInfo.dataValues.id });
        return res
          .status(201)
          .cookie('jwt', token, {
            httpOnly: true,
          })
          .json({ message: 'ok' });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error !' });
      }
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await User.findOne({ where: { email } });
    try {
      if (
        !userInfo ||
        !bcrypt.compareSync(password, userInfo.dataValues.password)
      ) {
        return res.status(401).json({ message: 'Invalid email or password ' });
      }
      const token = generateAccessToken({ id: userInfo.dataValues.id });
      sendAccessToken(res, token);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'server error !' });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('jwt');
      return res.status(200).json({ message: 'ok' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'server error !' });
    }
  },
  getAllUsers: async (req, res) => {
    const getAllUsers = await User.findAll();
    try {
      if (getAllUsers) {
        return res.status(200).json({ data: getAllUsers, message: 'ok' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'server error !' });
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const userById = await User.findOne({ where: { id } });
    try {
      if (userById) {
        return res.status(200).json({ data: userById, mesage: 'ok' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'server error !' });
    }
  },
  getUserByStackId: async (req, res) => {
    const { id } = req.params;
    const usersByStackId = await db.sequelize.models.user_stack.findAll({
      // id를 받아와서 user_stack 테이블에 stackId 가 받아온 id 랑 같은걸 findAll로 다 가져옴
      where: { stackId: id },
    });
    const userIds = [];
    for (let i = 0; i < usersByStackId.length; i++) {
      // findAll로 통해서 받아온 유저정보 중 필요한 userId 만 빼내는 작업
      userIds.push(usersByStackId[i].dataValues.UserId);
    }
    const users = [];
    for (let i = 0; i < userIds.length; i++) {
      // 빼낸 userId 와 User 테이블의 id 와 같은 걸 가져옴
      const userInfo = await User.findOne({ where: { id: userIds[i] } });
      users.push(userInfo.dataValues);
    }
    try {
      if (users) {
        return res.status(200).json({ data: users, message: 'ok' }); // user 정보를 보내준다
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'server error !' });
    }
  },
  updateUser: async (req, res) => {
    // email 은 고정값이라 수정이 불가능하지않을까 ? email 빼고 가져오자
    const { image, name, password, phone, info } = req.body; // 수정하려는 정보들을 클라이언트쪽에서 받아온다.
    const hashed = await bcrypt.hash(password, 10); // 패스워드를 바꿀경우 해싱해서 DB에 저장
    const foundName = await User.findOne({ where: { name } }); // 수정도 마찬가지로 이름 중복 체크
    if (foundName) {
      // updateUser 에 409 를 추가해줘야할거같다.
      return res.status(409).json({ message: 'name exists' });
    }
    await User.update(
      // 먼저 업데이트를 진행을 해준 후,
      {
        image,
        name,
        password: hashed,
        phone,
        info,
      },
      { where: { id: req.userId } }
    );
    const updateUser = await User.findOne({ where: { id: req.userId } }); // 업데이트 된 유저정보를 가져와서 response 해준다
    try {
      if (updateUser) {
        return res.status(200).json({ data: updateUser, message: 'ok' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'server error !' });
    }
  },
  deleteUser: async (req, res) => {
    const deleteUser = await User.destroy({ where: { id: req.userId } });
    try {
      if (deleteUser) {
        return res.status(200).json({ message: 'ok' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'server error !' });
    }
  },
  githubLogin: async (req, res) => {},
  goodbsw: async (req, res) => {
    return res.sendStatus(200);
  },
};
