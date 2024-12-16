// index.js
const express = require('express');
const cors = require('cors');
const lowRoute = require('./routes/low.route'); 
const mediumRoute = require('./routes/medium.route'); 
const highRoute = require('./routes/high.route'); 
const { getConnection } = require('./database'); 

const app = express();
app.use(express.json()); 
app.use(cors());

// Define your routes using the router
app.use('/api/low', lowRoute); 
app.use('/api/medium', mediumRoute); 
app.use('/api/high', highRoute); 

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

startServer();  
