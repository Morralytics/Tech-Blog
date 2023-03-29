const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: 'localhost',
                dialect: 'mysql',
                port: 3306,
            }
    );
}
// const sequelize = process.env.JAWSDB_URL
// ? new Sequelize(process.env.JAWSDB_URL)
// : new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306,
//     }
// );

// Exports the newly created Sequelize server information for the main server.js file to use
module.exports = sequelize;