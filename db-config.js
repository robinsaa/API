const mysql = require('mysql');

// Set database connection credentials
/*
const config = {
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database_name',
};
*/

// Dev credentials
const config = {
    host: 'pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'r5eclbki8gq7bgg5',
    password: 'hjcaku8tztilzcui',
    database: 'rhs5pq76ew4ry8b8'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;