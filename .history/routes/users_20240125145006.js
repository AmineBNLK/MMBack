const express = require('express');
const user_route = express();

const bodyParser = require('vody-parser');

user_route.use(bodyParser.json());

user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.set('view engine', 'ejs')
user_route.set('views', './views')

user_route.use(express.static)