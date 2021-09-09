const express = require('express');
const mongoose = require('mongoose');
const coockieParser = require('cookie-parser');
const todoroutes = require('./routes/todoRoutes');
const {checkUser} = require('./middleware/authMiddleware');
const app = express();

app.set('view engine','ejs');

app.use(express.static('assets'));
app.use(express.json());
app.use(coockieParser());
app.use(express.urlencoded({extended: true}));
app.get('*', checkUser);
app.use(todoroutes);


app.listen('3000');
