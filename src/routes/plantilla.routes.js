// 📁 routes/plantilla.routes.js
const express = require('express');
const router = express.Router();
const plantillaController = require('../controllers/plantilla.controller');

router.get('/', plantillaController.getAll);
router.post('/', plantillaController.create);
router.put('/:id', plantillaController.update);
router.delete('/:id', plantillaController.delete);

module.exports = router;