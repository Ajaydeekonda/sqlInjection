const mysql = require('mysql2/promise');
require('dotenv').config();


// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user : 'root',
  password: 'Dikonda9@',
  database: 'users',
  multipleStatements: true
});

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the MySQL database');
    return connection;  
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    throw err;  // Rethrow the error for handling in the caller
  }
};

module.exports = { getConnection };
