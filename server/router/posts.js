const express = require('express');
const postsController = require('../controller/posts');
const isAuth = require('../middleware/checkToken');

const router = express.Router();

router.post('/', isAuth, postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/:id', isAuth, postsController.getPostsById);
router.get('/stacks/:id', postsController.getPostsByStackId);
router.patch('/:id', isAuth, postsController.updatePost);
router.delete('/:id', isAuth, postsController.deletePost);

module.exports = router;
