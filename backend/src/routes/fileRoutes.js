const express = require('express');
const { uploadFile } = require('../controllers/fileController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
