const { join } = require('path');

const express = require('express');

const controllerPath = join(__dirname, '..' , 'controllers', 'index');
const indexController = require(controllerPath);

const router = express.Router();

router.get('/', indexController.get);

router.post('/', indexController.post);

module.exports = router;