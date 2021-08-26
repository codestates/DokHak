const express = require('express');

const router = express.Router();
const usersController = require('../controller/users');

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.post('/github', usersController.githubLogin);
router.post('/logout', usersController.logout);
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.get('/stacks/:id', usersController.getUserByStackId);
router.patch('/', usersController.updateUser);
router.delete('/', usersController.deleteUser);

module.exports = router;
