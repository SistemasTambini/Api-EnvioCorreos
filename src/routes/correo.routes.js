const express = require('express');
const router = express.Router();
const {
  getCorreosPorTipo,
  getTiposEnvio,
  crearTipoEnvio
} = require('../controllers/correo.controller');

// Obtener todos los correos por tipo_id
router.get('/correos/tipo/:tipo_id', getCorreosPorTipo);

// Obtener lista de tipos de envío
router.get('/tipos-envio', getTiposEnvio);


// Nuevo endpoint:
router.post('/tipos-envio', crearTipoEnvio);

module.exports = router;
