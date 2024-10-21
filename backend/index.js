// index.js
const express = require('express');
const cors = require('cors');
const router = require('./routes/users.route'); // Assuming you have a router defined
const { getConnection } = require('./database'); // Import connect as a function

const app = express();
app.use(express.json()); 
app.use(cors());

// Define your routes using the router
app.use('/api/users', router); // Make sure to set up the route correctly

const startServer = async () => {
  try {
    await getConnection(); // Await the connection
    app.listen(9000, () => {
      console.log('Server is running at port 9000');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();  // Call the function to start the server
