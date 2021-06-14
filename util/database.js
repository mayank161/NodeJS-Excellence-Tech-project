const Sequelize = require('sequelize');

const db = new Sequelize('student','postgres','mayank', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = db;