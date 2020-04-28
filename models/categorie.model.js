const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorieSchema = new Schema({
    nom : {
        type : String,
        required : true,
    },
    url : {
        type : String,
        required : true,
    },
    titre : String,
    description : String,
    motsClefs : String
})
const model =  mongoose.model('categorie', categorieSchema);
module.exports = model