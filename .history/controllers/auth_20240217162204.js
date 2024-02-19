const bcrypt = require("bcrypt")
const path = require("path")
const saltRounds = 10
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Joueur = require("../models/Joueur")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const LocalStrategy = require("passport-local").Strategy

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

// // serialize(from json data to a serie of strings) and deserialize user(from a serie of strings to a json data)
// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })
// passport.deserializeUser((id, done) => {
//   Joueur.findById(id).then((user) => {
//     done(null, user)
//   })
// })

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      // passReqToCallback: true,
    },
    async (username, password, done) => {
      const currUser = await Joueur.findOne({ email: username })

      if (!currUser) {
        return done(null, false, {
          message: "Aucun utilisateur enregistrer avec cet email",
        })
      }

      // Vérifier le mot de passe
      bcrypt.compare(password, currUser.password, (err, isMatch) => {
        if (err) {
          return done(err)
        }
        if (isMatch) {
          return done(null, currUser)
        } else {
          return done(null, false, {
            message: "Nom d'utilisateur ou mot de passe incorrecte",
          })
        }
      })
    }
  )
)

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      posts,
      phone,
      region,
      description,
      niveau,
      hasCompletedProfile,
      photo,
      adresse,
      age,
    } = req.body
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error("Erreur lors du hashage du mot de passe :", err)
      }
      const newUser = await Joueur.create({
        name,
        email,
        password: hashedPassword,
        role,
        posts,
        phone,
        region,
        description,
        niveau,
        hasCompletedProfile,
        photo,
        adresse,
        age,
      })
      // Connecter automatiquement l'utilisateur après l'inscription
      await req.logIn(newUser, (err) => {
        if (err) {
          console.error("Erreur lors de la connexion de l'utilisateur :", err)
          return next(err)
        }
        // Renvoyer une réponse pour indiquer que l'inscription et la connexion ont réussi
        res.status(200).json({ success: true, user: newUser })
      })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.login = async (req, res, next) => {
  // passport.authenticate('local', { failureRedirect: '/Login' }),
  //   function (req, res) {
  //     res.redirect('http://localhost:5173/Profil')
  //   };
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res
        .status(400)
        .json({ message: "Nom d'utilisateur ou mot de passe incorrecte" })
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      res.status(200).send(user)
    })
  })(req, res, next)
}

exports.logout = async (req, res) => {
  req.logOut()
  req.session = null
  res.redirect("http://localhost:5173/Profile")
}

// // @desc    Register joueur
// // @route   POST /api/v1/auth/register
// // @access  Public
// exports.register = asyncHandler(async (req, res, next) => {
//   const { name, email, password, role } = req.body;

//   // Create user
//   const joueur = await Joueur.create({
//     name,
//     email,
//     password,
//     role,
//   });

//   // Create token
//   sendTokenResponse(joueur, 200, res);
// });

// // @desc    Login joueur
// // @route   POST /api/v1/auth/login
// // @access  Public
// exports.login = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;

//   // Validate email& password
//   if (!email || !password) {
//     return next(new ErrorResponse('Please provide an email and password', 400));
//   }

//   // Check for user
//   const joueur = await Joueur.findOne({ email }).select('+password');

//   if (!joueur) {
//     return next(new ErrorResponse('Invalid credentiels', 401));
//   }

//   // Check if password matches
//   const isMatch = await joueur.matchPassword(password);

//   if (!isMatch) {
//     return next(new ErrorResponse('Invalid credentials', 401));
//   }

//   sendTokenResponse(joueur, 200, res);
// });

// // Get token from model, create cookie and send response
// const sendTokenResponse = (joueur, statusCode, res) => {
//   // Create token
//   const token = joueur.getSignedJwtToken();

//   const options = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   if (process.env.NODE_ENV === 'production') {
//     options.secure = true;
//   }

//   res.status(statusCode).cookie('token', token, options).json({
//     success: true,
//     token,
//   });
// };

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const joueur = await Joueur.findById(req.joueur.id)

  res.status(200).json({
    success: true,
    data: joueur,
  })
})

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  }

  const joueur = await Joueur.findByIdAndUpdate(req.joueur.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    date: joueur,
  })
})

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const joueur = await Joueur.findById(req.joueur.id).select("+password")

  // Check current password
  if (!(await joueur.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401))
  }

  joueur.password = req.body.newPassword
  await joueur.save()

  sendTokenResponse(joueur, 200, res)
})

// Google login

const GOOGLE_CLIENT_ID =
  "9546333874-0uoqhlj706fnd3fqluen6pjo337tmsq5.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
      scope: ["email", "profile"],
    },

    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // Vérifiez si l'utilisateur existe déjà dans la base de données
        let joueur

        // Si l'utilisateur est déjà connecté
        if (request.user) {
          joueur = request.user
          joueur.googleId = profile.id
          joueur.googleEmail = profile.emails[0].value
        } else {
          joueur = await Joueur.findOne({ googleId: profile.id })

          if (!joueur) {
            // Vérifiez si l'email existe déjà
            joueur = await Joueur.findOne({ email: profile.emails[0].value })
          }

          if (!joueur) {
            // Si l'utilisateur n'existe pas, créez un nouvel utilisateur avec les informations Google
            joueur = await Joueur.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              googleEmail: profile.emails[0].value,
              photo: profile.photos[0].value.replace("s-96", "s-500"),
              // Ajoutez d'autres champs si nécessaire
            })
          }
        }

        // Enregistrez le joueur dans la base de données
        // await joueur.save()

        // Renvoyez l'utilisateur
        return done(null, joueur)
      } catch (error) {
        console.error(error)
        return done(error, null)
      }
    }
  )
)

// @desc    Logout joueur
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000), // expire le cookie dans 10 secondes
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc    Upload photo for joueur
// @route   Put /api/v1/joueurs/:id/photo
// @access  Private
exports.joueurPhotoUpload = asyncHandler(async (req, res, next) => {
  const joueur = await Joueur.findById(req.params.id)

  if (!joueur) {
    return next(
      new ErrorResponse(
        `Joueur avec l'id de ${req.params.id} n'existe pas`,
        404
      )
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Ajouter un upload file`, 404))
  }

  const file = req.files.file

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image les than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    )
  }

  // Create custom filename
  file.name = `photo_${joueur._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await Joueur.findByIdAndUpdate(req.params.id, { photo: file.name })
    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
