const express = require('express');
const commentsController = require('../controller/comments');
const isAuth = require('../middleware/checkToken');

const router = express.Router();

router.post('/:id', isAuth, commentsController.addComment);
router.get('/:id', commentsController.getCommentsByPostId);
router.patch('/:id', isAuth, commentsController.updateComment);
router.delete('/:id', isAuth, commentsController.deleteComment);

module.exports = router;
