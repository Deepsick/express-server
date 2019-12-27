const { join } = require('path');

const express = require('express');
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) =>  {
      cb(null, 'public/assets/img/uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const controllerPath = join(__dirname, '..' , 'controllers', 'admin');
const adminController = require(controllerPath);

const router = express.Router();

router.get('/', adminController.get);

router.post('/upload', upload.single('photo'), adminController.postProduct);

router.post('/skills', adminController.postSkills);

module.exports = router;