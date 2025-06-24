const bd = require('../../BD/mysqlv2');
const TABLA = 'puertas';

function todos() {
    return bd.todos(TABLA);
}

function uno(id) {
    return bd.uno(TABLA, id);
}

async function actualizarEstado(id, status) {
    return bd.actualizar(TABLA, { id, status });
}

module.exports = { todos, uno, actualizarEstado };