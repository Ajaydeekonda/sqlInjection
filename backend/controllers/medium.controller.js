const { getConnection } = require('../database');

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
      `SELECT name, email FROM userdetails WHERE userid = ${parsedUserId}`
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

module.exports = getUsers;
