const { getConnection } = require('../database');
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

module.exports = getUsers;
