const express = require('express');
const multer = require('multer');
const { uploadExcel } = require('../controllers/upload.controller');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-excel/:tipo_id', upload.single('file'), uploadExcel);

module.exports = router;
