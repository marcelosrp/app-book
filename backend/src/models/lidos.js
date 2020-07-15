const Sequelize = require('sequelize');
const connection = require('../database');
const User = require('./users');

const Lidos = connection.define('lidos', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    thumb: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Lidos.sync({ force: false }).then(() => {});

Lidos.belongsTo(User);
User.hasMany(Lidos);

module.exports = Lidos;