const express = require('express');
// const { body } = require('express-validator');

const isAuth = require('../middleware/checkToken');
// const validate = require('../middleware/validator');
const usersController = require('../controller/users');

const router = express.Router();

// const validateCredential = [
//   body('name')
//     .trim()
//     .isLength({ min: 2 })
//     .notEmpty()
//     .withMessage('username should be at least 2 characters'),
//   body('password')
//     .trim()
//     .isLength({ min: 6 })
//     .withMessage('password should be at least 6 characters'),
//   validate,
// ];

// const validateSignup = [
//   ...validateCredential,
//   body('name').notEmpty().withMessage('name is required !'),
//   body('email').isEmail().normalizeEmail().withMessage('invalid email !'),
//   validate,
// ];

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.post('/github', usersController.githubLogin);
router.post('/logout', isAuth, usersController.logout);
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.get('/stacks/:id', usersController.getUserByStackId);
router.patch('/', isAuth, usersController.updateUser);
router.delete('/', isAuth, usersController.deleteUser);

module.exports = router;
