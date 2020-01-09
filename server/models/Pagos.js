const Sequelize = require('sequelize');

const db = require('../config/database');

const Pago = db.define('pago', {
    id_cliente: {
        type: Sequelize.INTEGER
    },
    id_viaje: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE, defaultValue: Sequelize.NOW
    }
})

module.exports = Pago;