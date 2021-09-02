const bcrypt = require('bcrypt');
const axios = require('axios');
const { generateAccessToken, sendAccessToken } = require('./tokenFunctions');
const { User } = require('../models');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  signup: async (req, res) => {
    const { image, email, name, password, phone, info, stacks } = req.body;
    const foundEmail = await User.findOne({ where: { email } });
    const foundName = await User.findOne({ where: { name } });
    if (foundEmail) {
      console.log('Email exists');
      return res.status(409).json({ message: 'Email exists' });
    } else if (foundName) {
      console.log('Name exists');
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
        console.log('여기');
        for (let i = 0; i < stacks.length; i++) {
          // 클라이언트쪽에서 stacks 를 받아오면 for문을 돌려서 새로운 배열에 푸쉬해준다
          userStack.push({
            UserId: userInfo.dataValues.id, // user_stack 의 userId
            StackId: stacks[i], // user_stack 의 StackId
          });
        }
        await db.sequelize.models.user_stack.bulkCreate(userStack); // bulkCreate 인자는 배열이돼야한다. 여러가지 옵션을 추가할수있지만 쓸만한건 안보임
        const token = generateAccessToken({ id: userInfo.dataValues.id });
        return res.status(201).json({ message: 'OK' });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
      }
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await User.findOne({
        where: { id: req.userId },
        attributes: ['id', 'image', 'email', 'name', 'phone', 'info'],
        raw: true,
      });
      return res.status(200).json({ data: users, message: 'OK' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  login: async (req, res) => {
    // 유저정보 보내주기 수정필요
    const { email, password } = req.body;
    const userInfo = await User.findOne({ where: { email } });
    try {
      if (
        !userInfo ||
        !bcrypt.compareSync(password, userInfo.dataValues.password)
      ) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const loginInfo = await User.findOne({
        attributes: ['id', 'image', 'email', 'name', 'phone', 'info'],
        where: { email },
        raw: true,
      });
      const usersWithStacks = [];
      const stackId = {};
      let stacks = await db.sequelize.models.user_stack.findAll({
        attributes: ['StackId'],
        where: { UserId: loginInfo.id },
        raw: true,
      });
      stacks = stacks.map((stack) => stack.StackId);
      stackId['stacks'] = stacks;
      usersWithStacks.push(Object.assign(loginInfo, stackId));
      const token = generateAccessToken({ id: userInfo.dataValues.id });
      return res
        .status(200)
        .cookie('jwt', token, {
          sameSite: 'none',
          secure: true,
          httpOnly: true,
        })
        .json({ data: usersWithStacks, message: 'OK' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('jwt');
      return res.status(200).json({ message: 'OK' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  getAllUsers: async (req, res) => {
    const users = await User.findAll({
      attributes: ['id', 'image', 'email', 'name', 'phone', 'info'],
      raw: true,
    });
    const usersWithStacks = [];
    for (let i = 0; i < users.length; i++) {
      const stackId = {};
      let stacks = await db.sequelize.models.user_stack.findAll({
        attributes: ['StackId'],
        where: { UserId: users[i].id },
        raw: true,
      });
      stacks = stacks.map((stack) => stack.StackId);
      stackId['stacks'] = stacks;
      usersWithStacks.push(Object.assign(users[i], stackId));
    }
    try {
      if (usersWithStacks) {
        return res.status(200).json({ data: usersWithStacks, message: 'OK' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await User.findOne({
        where: { id: req.userId },
        attributes: ['id', 'image', 'email', 'name', 'phone', 'info'],
        raw: true,
      });
      return res.status(200).json({ data: users, message: 'OK' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  getUserById: async (req, res) => {
    // user id 가 없을경우 빈배열을 리턴하는데 이게 맞는지 아니면 에러를 줘야하는지 ? 클라쪽 상의 필요
    // 유저를 id 별로 가져오는 함수
    const { id } = req.params;
    const userById = await User.findOne({
      attributes: ['id', 'image', 'email', 'name', 'phone', 'info'],
      raw: true,
      where: { id },
    });
    const usersWithStacks = [];
    const stackId = {};
    let stacks = await db.sequelize.models.user_stack.findAll({
      attributes: ['StackId'],
      where: { UserId: userById.id },
      raw: true,
    });
    stacks = stacks.map((stack) => stack.StackId);
    stackId['stacks'] = stacks;
    usersWithStacks.push(Object.assign(userById, stackId));
    try {
      if (usersWithStacks) {
        return res.status(200).json({ data: userById, mesage: 'OK' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  getUserByStackId: async (req, res) => {
    // stack id 가 없을경우 빈배열을 리턴하는데 이게 맞는지 아니면 에러를 줘야하는지 ? 클라쪽 상의 필요
    const { id } = req.params;
    const usersByStackId = await db.sequelize.models.user_stack.findAll({
      attributes: ['UserId'],
      // id를 받아와서 user_stack 테이블에 stackId 가 받아온 id 랑 같은걸 findAll로 다 가져옴
      where: { stackId: id },
      raw: true,
    });
    const usersInfo = [];
    for (let i = 0; i < usersByStackId.length; i++) {
      const users = await User.findOne({
        attributes: ['id', 'image', 'email', 'name', 'phone', 'info'],
        where: { id: usersByStackId[i].UserId },
        raw: true,
      });
      usersInfo.push(users);
    }
    const usersWithStacks = [];
    for (let i = 0; i < usersInfo.length; i++) {
      const stackId = {};
      let stacks = await db.sequelize.models.user_stack.findAll({
        attributes: ['StackId'],
        where: { UserId: usersInfo[i].id },
        raw: true,
      });
      stacks = stacks.map((stack) => stack.StackId);
      stackId['stacks'] = stacks;
      usersWithStacks.push(Object.assign(usersInfo[i], stackId));
    }
    try {
      if (usersWithStacks) {
        return res.status(200).json({ data: usersWithStacks, message: 'OK' }); // user 정보를 보내준다
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  updateUser: async (req, res) => {
    // stacks 추가해야함
    // email 은 고정값이라 수정이 불가능하지않을까 ? email 빼고 가져오자
    const { image, name, password, phone, info, stacks } = req.body; // 수정하려는 정보들을 클라이언트쪽에서 받아온다.
    const hashed = await bcrypt.hash(password, 10); // 패스워드를 바꿀경우 해싱해서 DB에 저장
    const foundName = await User.findOne({ where: { name } }); // 수정도 마찬가지로 이름 중복 체크
    if (foundName) {
      // updateUser 에 409 를 추가해줘야할거같다.
      return res.status(409).json({ message: 'Name exists' });
    }
    await User.update(
      // 먼저 업데이트를 진행을 해준 후,
      {
        image,
        name,
        password: hashed,
        phone,
        info,
        stacks,
      },
      { where: { id: req.userId } }
    );
    const updateUser = await User.findOne({
      attributes: ['image', 'name', 'phone', 'info'],
      where: { id: req.userId },
      raw: true,
    }); // 업데이트 된 유저정보를 가져와서 response 해준다
    let stack = {};
    stack['stacks'] = stacks;
    const userWithStackId = Object.assign(updateUser, stack);
    try {
      if (updateUser) {
        return res.status(200).json({ data: userWithStackId, message: 'OK' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  deleteUser: async (req, res) => {
    const deleteUser = await User.destroy({ where: { id: req.userId } }); // 회원 탈퇴 로직
    try {
      if (deleteUser) {
        return res.status(200).json({ message: 'OK' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  githubLogin: async (req, res) => {
    const githubLoginURL = 'https://github.com/login/oauth/access_token';
    const githubInfoURL = 'https://api.github.com/user';
    try {
      await axios
        .post(
          githubLoginURL,
          {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.body.authorization,
          },
          {
            headers: {
              accept: 'application/json',
            },
          }
        )
        .then(async (result) => {
          let accessToken = result.data.access_token;
          await axios
            .get(githubInfoURL, {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            })
            .then(async (result) => {
              const userInfo = await User.findOne({
                where: {
                  email: `${result.data.login}@github.com`,
                },
              });
              if (!userInfo) {
                res.status(200).json({
                  data: { email: `${result.data.login}@github.com` },
                  message: 'OK',
                });
              }
            });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
};
