const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = (req, res, next) => {
  const token = req.cookies['jwt'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized Request' });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRETKEY, async (err, encoded) => {
      if (err) {
        res.sendStatus(401);
      }
      const userInfo = await User.findOne({ where: { id: encoded.id } });
      if (!userInfo) {
        res.sendStatus(401);
      }
      req.userId = encoded.id;
      return next();
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

module.exports = isAuth;
