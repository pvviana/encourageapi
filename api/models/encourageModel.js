'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var PerfilSchema = new Schema({
  nome: {
    type: String,
    required: 'Escreva seu Nome.'
  },
  senha: { 
    type: String, 
    required: true 
  },
  sexo:{
        type: String,
        enum: ['Masculino', 'Feminino'],
        required: 'Escreva seu sexo.'
  },
  Data_Nascimento: {
    type: Date,
    required: 'Escreva sua Data de Nascimento.'
  },
  cpf:     { 
      type: Number, 
      required: 'Escreva seu cpf.'
    },
  status: {
    type: [{
      type: String,
      enum: ['Normal', 'Moderador', 'Administrador']
    }],
    default: ['Normal']
  },
  Usuario_Confirmado: {
    type: [{
      type: String,
      enum: ['N', 'S']
    }],
    default: ['N']
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

PerfilSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('senha')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.senha, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.senha = hash;
          next();
      });
  });
});

PerfilSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.senha, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};




module.exports = mongoose.model('Perfils', PerfilSchema);