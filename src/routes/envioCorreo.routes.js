const express = require('express');
const router = express.Router();
const controller = require('../controllers/envioCorreo.controller');

router.post('/', controller.crear);       // Crear envío y registrar destinatarios
router.post('/:id/enviar', controller.enviar); // Procesar y enviar correos
router.post('/grupo/:tipoId/enviar', controller.enviarPorGrupo);

module.exports = router;
