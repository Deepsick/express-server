const { join } = require('path');

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const controllerPath = join(__dirname, '..' , 'controllers', 'admin');
const adminController = require(controllerPath);

const router = express.Router();

router.get('/', adminController.get);

router.post('/upload', upload.single('photo'), adminController.postProduct);

router.post('/skills', adminController.postSkills);

module.exports = router;