const express = require('express');
const commentsController = require('../controller/comments');

const router = express.Router();

router.post('/:id', commentsController.addComment);
router.get('/:id', commentsController.getCommentsByPostId);
router.patch('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
