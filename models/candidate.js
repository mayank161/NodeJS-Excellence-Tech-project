const Sequelize = require('sequelize');

const db = require('../util/database');

const candidate = db.define('candidate',{
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    address: Sequelize.STRING
});

module.exports = candidate;