const express = require('express');
const router = express.Router();
const visitaController = require('../controllers/visitaController');

router.get('/visitas', visitaController.obtenerVisitas);
router.get('/estadisticas', visitaController.obtenerEstadisticas);
router.post('/visitas', visitaController.registrarVisita);

module.exports = router;