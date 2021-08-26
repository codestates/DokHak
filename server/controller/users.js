const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  signup: async (req, res) => {},
  login: async (req, res) => {},
  githubLogin: async (req, res) => {},
  getAllUsers: async (req, res) => {},
  logout: async (req, res) => {},
  getUserById: async (req, res) => {},
  getUserByStackId: async (req, res) => {},
  updateUser: async (req, res) => {},
  deleteUser: async (req, res) => {},
};

const createJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.EXPIRES_DAY,
  });
};
