const { getConnection } = require('../database');

const getUsers = async (req, res) => {
  const { userId } = req.body; 
  let connection; // Declare a variable to hold the connection
  
  try {
    connection = await getConnection(); // Get a connection from the pool

    // Use parameterized query to prevent SQL injection
    const [rows, fields] = await connection.query(`select name, email from userdetails where userid = ${userId}`);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(rows); 
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({message : error.message}); 
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
};

module.exports = getUsers;
