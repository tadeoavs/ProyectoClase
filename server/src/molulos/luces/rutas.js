const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

// Obtener todas las luces
router.get('/', async (req, res) => {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, 200, items);
    } catch (error) {
        respuesta.error(req, res, 500, 'Error al obtener luces', error);
    }
});

// Actualizar estado de una luz
router.post('/update', async (req, res) => {
    try {
        const { id, status } = req.body;
        await controlador.actualizarEstado(id, status);
        respuesta.success(req, res, 200, { id, status });
    } catch (error) {
        respuesta.error(req, res, 500, 'Error al actualizar luz', error);
    }
});

module.exports = router;