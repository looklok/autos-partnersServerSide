const router = require('express').Router();
const Admin = require('../models/admin.model');
const AuthController = require('../controllers/authController');

getToken=function(req){
    return req.body.token;
}


router.route('/login').post((req, res)=>{
    var email = req.body.email;
    var password = req.body.motDePasse;
    var token = getToken(req);

    if (token){

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
})


router.post('/addAdmin',
    function (req, res) {

      var email = req.body.email;
      var password = req.body.motDePasse;
      console.log(email)
      if (!req.body.superAdmin) { superAdmin = false; } else { superAdmin = true; }
      email = email.toLowerCase();
      var admin = new Admin();
      admin.email = email;
      admin.motDePasse = Admin.generateHash(password);
      admin.superAdmin = superAdmin;
      admin.save((err, admin)=>{
          if (err){
              res.status(400).send(err);
          }else{
              console.log(admin._id)
              token = admin.generateAuthToken();
              res.send({
                  token : token,
                  admin : admin
              })
          }
      })
 
    });


    module.exports = router;