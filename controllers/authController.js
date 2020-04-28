
const Admin = require('../models/admin.model')
const jwt        = require('jsonwebtoken');


AuthController = {};

AuthController.loginWithPassword = function(email, password, callback) {
    Admin.findOne({
        email: email.toLowerCase()
    })
      .select("+motDePasse")
      .exec(function(err, admin) {
        if (err) {
          return callback(err);
        }else{
        if (admin == false) {
          return callback({
              success : false,
              message: "cet email n'existe pas!"
          });
        }else{
        
        if (!admin.checkPassword(password)) {
          return callback({
            success : false,
            message: "mot de passe incorrect"
          });
        }
  
        var token = admin.generateAuthToken();
    
        delete admin.motDePasse;
        return callback(null, token, admin);
      }}});
  };
  
  AuthController.loginWithToken = function(token, callback){
    jwt.verify(token, process.env.JWT_SECRET, function(err, id){
      if (err) {
        return callback(err);
      }
      Admin.findOne({_id: id}, callback);
    });
  }


  module.exports = AuthController;