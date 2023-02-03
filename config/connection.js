// I use sequalize to connect to my sql server which will be run in the main server file
// The dotenv package allows for my sql server information to be properly hidden from the public (GitHub)
    // However, I only need to require it with the method .config() without passing it into a variable like Sequelize
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3001
    }
);

// Exports the newly created Sequelize server information for the main server.js file to use
module.exports = sequelize;