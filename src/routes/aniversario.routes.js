const express = require('express');
const router = express.Router();
const { handleEnvioAniversario } = require('../controllers/aniversario.controller');

router.post('/enviar-aniversario', handleEnvioAniversario);

module.exports = router;