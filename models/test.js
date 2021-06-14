const Sequelize = require('sequelize');

const db = require('../util/database');

const test = db.define('test',{
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    test1:{
        type: Sequelize.INTEGER,
        validate: {
            min:0,
            max:10
        }
    },
    test2:{
        type: Sequelize.INTEGER,
        validate: {
            min:0,
            max:10
        }
    },
    test3:{
        type: Sequelize.INTEGER,
        validate: {
            min:0,
            max:10
        }
    },
    totalMarks: {
        type: Sequelize.INTEGER,
        validate: {
            min:0,
            max:30
        }
    }
});

module.exports = test;