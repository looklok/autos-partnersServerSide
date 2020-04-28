const router = require('express').Router();
const Categorie = require('../models/categorie.model');

router.route('/').get((req, res) => {

    Categorie.find().then((categories)=>{
        res.send(categories);
    }).catch((err)=>{
        res.send(err).status(400);
    })

});

router.route('/one/:id').get((req, res) =>{
    var id = req.params.id;
    Categorie.findById(id).then((Categorie) =>{
        res.send(Categorie);
    }).catch((err)=>{
        res.status(400).send(err);
    })
});

router.post('/add',(req, res)=>{
    const newCategorie = new Categorie();
    newCategorie.titre = req.body.titre;
    newCategorie.description = req.body.description;
    newCategorie.motsClefs = req.body.motsClefs;
    newCategorie.nom  = req.body.nom;
    newCategorie.url = req.body.url;
    newCategorie.save().then(()=>{
        response = {msg : 'categorie ajoutée', id :newCategorie._id};
        res.status(200).json(response);
    })
    .catch((err)=> {
         res.status(400).json(err);
    });

});

router.route('/:id').delete(
    (req,res) =>{
    Categorie.deleteOne({_id : req.params.id})
    .then(res.json('categorie supprimée'))
    .catch(err=> res.status(400).json(err));
});


router.route('/update/:id').put((req, res)=>{
    var newCategorie = {}

    newCategorie.titre = req.body.titre;
    newCategorie.description = req.body.description;
    newCategorie.motsClefs = req.body.motsClefs;
    newCategorie.nom  = req.body.nom;
    newCategorie.url = req.body.url;

    for(let prop in newCategorie) if (!newCategorie[prop])  delete newCategorie[prop];
    Categorie.updateOne({_id : req.params.id}, newCategorie).then(
        ()=>res.json('categorie modifiée')
    ).catch(
        (err)=>res.status(400).json(err)
    );
});
module.exports = router;

