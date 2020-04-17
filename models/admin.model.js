const mongoose = require('mongoose'),
      bcrypt     = require('bcrypt'),
      jwt = require('jsonwebtoken');
      

var Schema = mongoose.Schema;

const adminSchema = new Schema({
    superAdmin : Boolean,
    name : String,
    prenom : String,
    email : String,
    login: {
        type: String,
        min: 1,
        max: 100,
      },
    
    motDePasse: {
        type: String,
        required: true,
       // select: false, // for default projection
      },
    sex : {
        type : String,
        enum : {
            values : ['m', 'f']
        }
    },

});


adminSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.motDePasse);
};

adminSchema.methods.generateAuthToken = function(){
    return jwt.sign(this._id.toString(), process.env.JWT_SECRET);
};


adminSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
adminSchema.statics.getByToken = function(token, callback){
    jwt.verify(token, process.env.JWT_SECRET, function(err, id){
      if (err) {
        return callback(err);
      }
      this.findOne({_id: id}, callback);
    }.bind(this));
};
const model =  mongoose.model('admin', adminSchema);
module.exports =model