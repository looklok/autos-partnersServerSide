const router = require('express').Router();
const Admin = require('../models/admin.model');
const AuthController = require('../controllers/authController');

getToken=function(req){
    return req.body.token;
}

estAuthentifie = function(req , res, next){
    var token = getToken(req);
    Admin.getByToken(token, (err, admin)=>{
        if (err){
            return res.status(500).send(err);
        }
        if (admin){
            req.admin = admin;
            console.log(admin)
            return next();

        }
        return res.status(401).send({
          msg : "go away"
        });

    })
} 

router.route('/login').post((req, res)=>{
    var email = req.body.email;
    var password = req.body.motDePasse;
    var token = getToken(req);

    if (token){
        AuthController.loginWithToken(token, (err, admin) =>{
            if (err || !admin){
                res.status(400).send(err);
            }else{
                res.send({
                    admin : admin,
                })
            }
        })

    }
    else{
        AuthController.loginWithPassword(email, password, (err, token, admin)=>{
            if (err){
                res.status(400).send(err);
            }else{
                res.send({
                    token : token,
                    admin : admin,
                })
            }
        })
    }
});



router.use(estAuthentifie);



router.post('/addAdmin',
    function (req, res) {

      var email = req.body.email;
      var password = req.body.motDePasse;
      var superAdmin =( req.body.superAdmin === 'true');
      email = email.toLowerCase();
      var admin = new Admin();
      admin.email = email;
      admin.motDePasse = Admin.generateHash(password);
      admin.superAdmin = superAdmin;
      admin.save((err, admin)=>{
          if (err){
              res.status(400).send(err);
          }else{
              token = admin.generateAuthToken();
              res.send({
                  token : token,
                  admin : admin
              })
          }
      })
 
    });

router.get('/all',(req, res)=>{
    Admin.find().then((admins)=>{
        res.send(admins);
    }).catch((err)=>{
        res.send(err).status(400);
    })
});


router.route('/:id').delete(
    (req,res) =>{
        Admin.deleteOne({_id : req.params.id})
    .then(res.json('admin supprimée'))
.catch(err=> res.status(400).json(err));});


router.route('/update/:id').put((req, res)=>{
    var admin = {};
    
    admin.email = req.body.email;
    admin.superAdmin =( req.body.superAdmin === 'true');
    for(var prop in admin) if(! admin[prop]) delete admin[prop]

    Admin.updateOne({_id: req.params.id}, admin).then(()=>{
        res.send('admin modifié')
    }).catch(
        (err)=>res.status(400).json(err)
    );
})


module.exports = router;