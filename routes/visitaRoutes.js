const express = require('express');
const router = express.Router();
const visitaController = require('../controllers/visitaController');

router.post('/visitas', visitaController.registrarVisita);

module.exports = router;