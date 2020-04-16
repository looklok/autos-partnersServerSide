const router = require('express').Router();
const Annonce = require('../models/annonce.model');

router.route('/').get((req, res) => {
    var offset = Number(req.query.offset);
    Annonce.find().skip(offset).limit(10).then((annonces)=>{
        res.send(annonces);
    }).catch((err)=>{
        res.send(err).status(400);
    })

});



router.route('/one/:id').get((req, res) =>{
    var id = req.params.id;
    Annonce.findById(id).then((Annonce) =>{
        res.send(Annonce);
    }).catch((err)=>{
        res.status(400).send(err);
    })
});



router.route('/add').post((req, res)=>{
        var newAnnonce = new Annonce();
        newAnnonce.nom = req.body.annonceData.nom;
        newAnnonce.prix = req.body.annonceData.prix;
        newAnnonce.description = req.body.annonceData.description;
        newAnnonce.categorie = req.body.annonceData.categorie;
        newAnnonce.fabriquant = req.body.annonceData.fabriquant;
        newAnnonce.miseEnCirculation = req.body.annonceData.miseEnCirculation;
        if(req.body.annonceData.kilometrage) newAnnonce.kilometrage = Number(req.body.annonceData.kilometrage);
        newAnnonce.nbrPorte = req.body.annonceData.nbrPorte;
        newAnnonce.boiteVitesse = req.body.annonceData.boiteVitesse;
        newAnnonce.version = req.body.annonceData.version;
        newAnnonce.energie = req.body.annonceData.energie;
        newAnnonce.couleurExterieure = req.body.annonceData.couleurExterieure;
        newAnnonce.premiereMain = (req.body.annonceData.premiereMain === 'true')
        newAnnonce.optionsEquipements = req.body.annonceData.optionsEquipements;
        newAnnonce.images = req.body.annonceData.images;
        newAnnonce.videos = req.body.annonceData.videos;
        //console.log(newAnnonce)
        newAnnonce.save().then(()=>{
            response = {msg : 'annonce ajoutée', id :newAnnonce._id};
            res.status(200).json(response);
        })
        .catch((err)=> {
             res.status(400).json(err);
        });

});

router.route('/:id').delete(
    (req,res) =>{
        Annonce.deleteOne({_id : req.params.id})
    .then(res.json('annonce supprimée'))
.catch(err=> res.status(400).json(err));})


router.route('/update/:id').put((req, res)=>{
    var newAnnonce = {}

    newAnnonce.nom = req.body.annonceData.nom;
    newAnnonce.prix = req.body.annonceData.prix;
    newAnnonce.description = req.body.annonceData.description;
    newAnnonce.categorie = req.body.annonceData.categorie;
    newAnnonce.fabriquant = req.body.annonceData.fabriquant;
    newAnnonce.miseEnCirculation = req.body.annonceData.miseEnCirculation;
    newAnnonce.kilometrage = Number(req.body.annonceData.kilometrage);
    newAnnonce.nbrPorte = req.body.annonceData.nbrPorte;
    newAnnonce.boiteVitesse = req.body.annonceData.boiteVitesse;
    newAnnonce.version = req.body.annonceData.version;
    newAnnonce.energie = req.body.annonceData.energie;
    newAnnonce.couleurExterieure = req.body.annonceData.couleurExterieure;
    newAnnonce.premiereMain = (req.body.annonceData.premiereMain === 'true')
    newAnnonce.optionsEquipements = req.body.annonceData.optionsEquipements;
    newAnnonce.images = req.body.annonceData.images;
    newAnnonce.videos = req.body.annonceData.videos;

    for(let prop in newAnnonce) if (!newAnnonce[prop])  delete newAnnonce[prop];
    Annonce.updateOne({_id : req.params.id}, newAnnonce).then(
        ()=>res.json('annonce modifiée')
    ).catch(
        (err)=>res.status(400).json(err)
    );
});
module.exports = router;