const Sequelize = require('sequelize');
const sequelize = new Sequelize('appointment-booking', 'root', '@Rgukt123', {
    dialect:'mysql',
    localhost:'localhost'
});

module.exports = sequelize;