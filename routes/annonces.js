const router = require('express').Router();
const Annonce = require('../models/annonce.model');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now().toString()+ '-' +file.originalname)
    }
  })
const upload = multer({ storage: storage })


router.route('/').get((req, res) => {
    var offset = Number(req.query.offset);
    Annonce.find()/*.skip(offset).limit(10)*/.then((annonces)=>{
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

router.route('/filtre').get((req, res) =>{
    var filtre = {}
    filtre.energie = req.body.energie;
    if (req.body.prix) filtre.prix = {$lte : Number(req.body.prix)};
    filtre.fabriquant=req.body.marque;
    for (critere in filtre) if (!filtre[critere]) delete filtre[critere]
    
    Annonce.find(filtre).then((Annonce) =>{
        res.send(Annonce);
    }).catch((err)=>{
        res.status(400).send(err);
    })
});

router.post('/add',upload.fields([{ name: 'images' }, { name: 'videos'}]),(req, res)=>{
        
        var newAnnonce = new Annonce();
        if(req.files["images"]){
            req.files["images"].forEach((file, index)=>{
                newAnnonce.images.toute[index] = process.env.ROOT_URL +'/'+ file.path;
            });
        }
        
        if(req.files["videos"]){
            req.files["videos"].forEach((file, index)=>{
                newAnnonce.videos[index] = process.env.ROOT_URL +'/'+ file.path;
            });
        }
        
        newAnnonce.nom = req.body.nom;
        newAnnonce.prix = req.body.prix;
        newAnnonce.description = req.body.description;
        newAnnonce.categorie = req.body.categorie;
        newAnnonce.fabriquant = req.body.fabriquant;
        newAnnonce.miseEnCirculation = req.body.miseEnCirculation;
        if(req.body.kilometrage) newAnnonce.kilometrage = Number(req.body.kilometrage);
        newAnnonce.nbrPorte = req.body.nbrPorte;
        newAnnonce.boiteVitesse = req.body.boiteVitesse;
        newAnnonce.version = req.body.version;
        newAnnonce.energie = req.body.energie;
        newAnnonce.couleurExterieure = req.body.couleurExterieure;
        newAnnonce.premiereMain = (req.body.premiereMain === 'true')
        newAnnonce.optionsEquipements = req.body.optionsEquipements;
        console.log(newAnnonce)
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

    newAnnonce.nom = req.body.nom;
    newAnnonce.prix = req.body.prix;
    newAnnonce.description = req.body.description;
    newAnnonce.categorie = req.body.categorie;
    newAnnonce.fabriquant = req.body.fabriquant;
    newAnnonce.miseEnCirculation = req.body.miseEnCirculation;
    newAnnonce.kilometrage = Number(req.body.kilometrage);
    newAnnonce.nbrPorte = req.body.nbrPorte;
    newAnnonce.boiteVitesse = req.body.boiteVitesse;
    newAnnonce.version = req.body.version;
    newAnnonce.energie = req.body.energie;
    newAnnonce.couleurExterieure = req.body.couleurExterieure;
    newAnnonce.premiereMain = (req.body.premiereMain === 'true')
    newAnnonce.optionsEquipements = req.body.optionsEquipements;
    newAnnonce.images = req.body.images;
    newAnnonce.videos = req.body.videos;

    for(let prop in newAnnonce) if (!newAnnonce[prop])  delete newAnnonce[prop];
    Annonce.updateOne({_id : req.params.id}, newAnnonce).then(
        ()=>res.json('annonce modifiée')
    ).catch(
        (err)=>res.status(400).json(err)
    );
});
module.exports = router;