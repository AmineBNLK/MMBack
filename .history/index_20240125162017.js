const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const cors = require('cors');
require('./controllers/auth');
const passport = require('passport');

const app = express();

//--------------------------------------------------------
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
//--------------------------------------------------------

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

//-----------------
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
//-------------------------

// utiliser cors

app.use(
  cors({
    credentials: true,
  })
);


//
app.use

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
app.use(express.static(path.join(__dirname, 'public/')));

// Mount routers
app.use('/api/v1/matches', matches);
app.use('/api/v1/terrains', terrains);
app.use('/api/v1/tournois', tournois);
app.use('/api/v1/auth', auth);
app.use('/api/v1/amis', amis);
app.use('/api/v1/rapports', rapports);

// --------------------------------------------------
// Google oauth2
app.get('/google', (req, res) => {
  res.send('<a href="/auth/google">Authentificate with Google</a>');
});

app.get('/main', (req, res) => {
  res.send('page principale');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile', // Rediriger vers la page de profil après la connexion
    failureRedirect: '/auth/failure',
  })
);

app.get('/auth/failure', (req, res) => {
  res.send('somthing went wrong..');
});

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', async (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('a plus');
});

// --------------------------------------------------

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

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
