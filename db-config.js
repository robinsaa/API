const mysql = require('mysql');

// Set database connection credentials
/*
const config = {
    host: 'localhost',
    user: 'root',
    password: 'borrowcup',
    database: 'borrowcupdb',
};
*/

const config = {
    host: 'pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'dh4oh0mg6ts9xakf',
    password: 'vtiol6rpn5ud0iud',
    database: 'rdkweq3whf3e73lz'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;