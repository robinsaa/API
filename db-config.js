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


// Prod credentials
const config = {
    host: 'pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'k9z4wkm7t1cr2ywi',
    password: 'gx2dumj22g5vl7mw',
    database: 'rzpnhe8v30e9tk16'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;