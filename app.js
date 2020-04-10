const express = require('express');
const cors = require('cors');
const annonceRoute = require('./routes/annonces');
const adminRoute = require('./routes/admins')
const app = express();
app.use(cors());
app.use(express.json());

app.use('/annonces',annonceRoute);
app.use('/admins', adminRoute);

module.exports = app;