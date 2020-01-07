const Sequelize = require('sequelize');
require('./config');
module.exports = new Sequelize(process.env.NOMBREDB, process.env.USERDB, process.env.PASSDB, {
    host: process.env.HOSTDB,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});