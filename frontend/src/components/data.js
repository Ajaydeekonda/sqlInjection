const low = `
   const { getConnection } = require('../database');

const getUsers = async (req, res) => {
  const { userId } = req.body; 
  let connection; // Declare a variable to hold the connection
  
  try {
    connection = await getConnection(); // Get a connection from the pool

    // Use parameterized query to prevent SQL injection
    const [rows, fields] = await connection.query(\`select name, email from userdetails where userid = $\{userId\}\`);
    
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

module.exports = getUsers;`

const medium = `const { getConnection } = require('../database');

const getUsers = async (req, res) => {
  const { userId } = req.body; 
  let connection;

  try {
    // Convert userId to a number if it is a string containing a numeric value
    const parsedUserId = Number(userId);

    // Basic validation: Check if the parsed userId is a valid number
    if (!parsedUserId || isNaN(parsedUserId)) {
        console.log("invalid input");
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    connection = await getConnection();

    // Vulnerable to SQL injection due to using string-based query
    const [rows] = await connection.query(
      \`SELECT name, email FROM userdetails WHERE userid = $\{parsedUserId\}\`
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error('Medium Security Error:', error);
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUsers;`


const high = `const { getConnection } = require('../database');
const Joi = require('joi');

const getUsers = async (req, res) => {
  const { userId } = req.body; 
  let connection;

  // Input validation using Joi for strong validation
  const schema = Joi.object({
    userId: Joi.number().integer().positive().required(),
  });

  const { error } = schema.validate({ userId });
  if (error) {
    return res.status(400).json({ message: 'Invalid input', details: error.details });
  }

  try {
    connection = await getConnection();

    // Fully secure parameterized query to prevent SQL injection
    const [rows] = await connection.query(
      'SELECT name, email FROM userdetails WHERE userid = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(
      rows.map(user => ({
        name: user.name,
        email: user.email,
      }))
    );
  } catch (error) {
    console.error('High Security Error:', error);
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUsers;`

export {low,medium,high};