const express = require('express');
const dotenv = require('dotenv');

// Route files
const matches = require('./routes/matches');

// Laod env vars
dotenv.config({ path: './config/.en' });

const app = express();

// Mount routers
app.use('/api/v1/matches', matches);

const PORT = process.env.PORT || 5000;

//Body parser
//app.use(express.json());

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);