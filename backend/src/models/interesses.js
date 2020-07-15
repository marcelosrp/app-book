const Sequelize = require('sequelize');
const connection = require('../database');
const User = require('./users');

const Interesses = connection.define('interesses', {
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

Interesses.sync({ force: false }).then(() => {});

Interesses.belongsTo(User);
User.hasMany(Interesses);

module.exports = Interesses;