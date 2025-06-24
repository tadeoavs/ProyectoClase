const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

// Obtener todas las puertas
router.get('/', async (req, res) => {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, 200, items);
    } catch (error) {
        respuesta.error(req, res, 500, 'Error al obtener puertas', error);
    }
});

// Actualizar estado de una puerta
router.post('/update', async (req, res) => {
    try {
        const { id, status } = req.body;
        await controlador.actualizarEstado(id, status);
        respuesta.success(req, res, 200, { id, status });
    } catch (error) {
        respuesta.error(req, res, 500, 'Error al actualizar puerta', error);
    }
});

module.exports = router;