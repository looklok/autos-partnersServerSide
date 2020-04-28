const express = require('express');
const cors = require('cors');
const annonceRoute = require('./routes/annonces');
const adminRoute = require('./routes/admins')
const categorieRoute = require('./routes/categories')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use('/uploads',express.static('./uploads'));
app.use('/annonces',annonceRoute);
app.use('/categories',categorieRoute);
app.use('/admins', adminRoute);

module.exports = app;