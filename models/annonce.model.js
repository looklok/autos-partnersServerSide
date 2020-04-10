const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const optionsEquipements = {
    antivol : [String],
    exterieurChassis : [String],
    interieur : [String],
    securite : [String],
    autre : [String],

};

const donneesComplementaires = {
    puissanceDIN : Number,
    voleurCoffre : Number,
    emissionCO2 : Number,
    consommationMixte : Number,
};

const images = {
    toute : [],
    exterieur : [],
    interieur : [],
    tableauBord : [],
    coffre : [],
    sieges :[] 

}

const annonceSchema = new Schema({
    nom : {
        type : Number,
        required : true,
    },
    prix : {
        type : Number,
        required : true,
    },
    description : String,
    categorie : String,
    fabriquant : String,
    miseEnCirculation : String,
    kilometrage : Number,
    nbrPorte : Number,
    boiteVitesse : {
        type : String,
        enum :{
            values : ['automatique', 'manuel']
        }
    },
    version : String,
    energie : String,
    couleurExterieure : String,
    premiereMain : Boolean,
    donneesComplementaires : donneesComplementaires,
    optionsEquipements : optionsEquipements,
    images : images,
    videos : [String],

})
const model =  mongoose.model('annonce', annonceSchema);
module.exports =model