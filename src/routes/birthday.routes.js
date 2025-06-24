const express = require('express');
const router = express.Router();
const { handleEnviarCumpleanios } = require('../controllers/birthday.controller');

router.post('/enviar-cumpleanios', handleEnviarCumpleanios);

module.exports = router;
