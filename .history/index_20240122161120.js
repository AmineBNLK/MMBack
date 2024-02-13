
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Laod env vars
dotenv.config({ path: './config/.env' });

// Connect db
connectDB();

// Route files
const matches = require('./routes/matches');
const terrains = require('./routes/terrains');
const tournois = require('./routes/tournois');
const auth = require('./routes/auth');
const amis = require('./routes/amis');
const rapports = require('./routes/rapports');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static)

// Mount routers
app.use('/api/v1/matches', matches);
app.use('/api/v1/terrains', terrains);
app.use('/api/v1/tournois', tournois);
app.use('/api/v1/auth', auth);
app.use('/api/v1/amis', amis);
app.use('/api/v1/rapports', rapports);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//Body parser
//app.use(express.json());

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server and exit process
  process.exit(1);
});
