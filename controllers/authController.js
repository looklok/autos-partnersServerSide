
const Admin = require('../models/admin.model')


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
  


  module.exports = AuthController;