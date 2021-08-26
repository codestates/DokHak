const express = require('express');
const postsController = require('../controller/posts');

const router = express.Router();

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostsById);
router.get('/stacks/:id', postsController.getPostsByStackId);
router.patch('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;
