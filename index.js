const path = require("path")
const express = require("express")
const session = require("express-session")
const cookieSession = require("cookie-session")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const fileupload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/error")
const connectDB = require("./config/db")
const cors = require("cors")
require("./controllers/auth")
const passport = require("passport")

const app = express()

// Laod env vars
dotenv.config({ path: "./config/.env" })

// Connect db
connectDB()

// Route files
const matches = require("./routes/matches")
const terrains = require("./routes/terrains")
const tournois = require("./routes/tournois")
const auth = require("./routes/auth")
const amis = require("./routes/amis")
const rapports = require("./routes/rapports")
const joueurs = require("./routes/joueurs")

//-----------------
app.use(
  session({
    secret: "cats",
    cookie: {
      maxAge: 1000 * 60 * 60 * 30,
      secure: false,
      httpOnly: false,
      // sameSite: 'none',
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())
//-------------------------

// utiliser cors

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
)

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// File uploading
app.use(fileupload())

// // EJS
// app.set('view engine', 'ejs');

// Set static folder
// app.use(express.static(path.join(__dirname, "public/")))
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")))

// Mount routers
app.use("/api/v1/matches", matches)
app.use("/api/v1/terrains", terrains)
app.use("/api/v1/tournois", tournois)
app.use("/api/v1/auth", auth)
app.use("/api/v1/amis", amis)
app.use("/api/v1/rapports", rapports)
app.use("/api/v1/joueurs", joueurs)

// app.use("/api/isAuthenticated", (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.status(200).send(req.user)
//   } else {
//     return res.status(503).send("aucun utilisateur connecter")
//   }
// })

// --------------------------------------------------

// Google

app.get("/main", (req, res) => {
  res.send("page principale")
})

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
)

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/Profile", // Rediriger vers la page de profil après la connexion
    failureRedirect: "http://localhost:5173/Failure",
  })
)

//--------------------------------------------------------
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401)
}
//--------------------------------------------------------

app.get("/auth/failure", (req, res) => {
  res.send("somthing went wrong..")
})

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`)
})

app.get("/google/logout", async (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect("http://localhost:5173/Login")
})

// Chat gpt solusion pour le logout
// app.get('/logout', async (req, res) => {
//   req.logout(); // Déconnecte l'utilisateur
//   req.session = null; // Détruit la session
//   res.send('À bientôt !');
// });

// --------------------------------------------------

app.use(errorHandler)
app.use("/api/isAuthenticated", (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user)
  } else {
    return res.status(503).send("aucun utilisateur connecter")
  }
})


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)

  // Close server and exit process
  process.exit(1)
})
