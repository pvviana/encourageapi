'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PerfilSchema = new Schema({
  nome: {
    type: String,
    required: 'Escreva seu Nome.'
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
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['Normal', 'Moderador', 'Administrador']
    }],
    default: ['Normal']
  }
});

module.exports = mongoose.model('Perfils', PerfilSchema);