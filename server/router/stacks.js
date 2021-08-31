const express = require('express');
const stacksController = require('../controller/stacks');

const router = express.Router();

router.get('/', stacksController.getAllStacks);

module.exports = router;
