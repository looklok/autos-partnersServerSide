const app = require('./app')
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 8000;
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/APsiteDB';

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true}, (err) => {
    if (err) console.log(err);
});
const db = mongoose.connection;
db.once('open',function(){
    console.log('we\'ve connected successfully to '+uri+' database')
});


app.listen(port, function() {
    console.log('the server is running on port ' + port);
});