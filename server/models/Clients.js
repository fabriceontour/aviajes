const Sequelize = require('sequelize');

const db = require('../config/database');

const Client = db.define('client', {
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    }
})

module.exports = Client;