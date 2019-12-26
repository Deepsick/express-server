const { join } = require('path');

const express = require('express');

const controllerPath = join(__dirname, '..' , 'controllers', 'login');
const loginController = require(controllerPath);

const router = express.Router();

router.get('/', loginController.get);

router.post('/', loginController.post);

module.exports = router;