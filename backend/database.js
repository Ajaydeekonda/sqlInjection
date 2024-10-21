const mysql = require('mysql2/promise');

// Create a pool of connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',
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
