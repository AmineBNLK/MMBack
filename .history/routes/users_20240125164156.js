const express = require('express');
const user_route = express();

const bodyParser = require('vody-parser');

user_route.use(bodyParser.json());

user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.set('view engine', 'ejs');
user_route.set('views', './views');

user_route.use(express.static('public'));

const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage:storage});

user_route.get('./register', )
user_route.post('./register', )
