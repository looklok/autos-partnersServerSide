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



module.exports = router;