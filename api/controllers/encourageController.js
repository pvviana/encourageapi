'use strict';


var mongoose = require('mongoose'),
  Perfil = mongoose.model('Perfils');

exports.listar_todos_perfils = function(req, res) {
  Perfil.find({}, function(err, perfil) {
    if (err)
      res.send(err);
    res.json(perfil);
  });
};




exports.criar_perfil = function(req, res) {
  var novo_perfil = new Perfil(req.body);
  novo_perfil.save(function(err, perfil) {
    if (err)
      res.send(err);
    res.json(perfil);
  });
};


exports.ler_perfil = function(req, res) {
  Perfil.findById(req.params.perfilId, function(err, perfil) {
    if (err)
      res.send(err);
    res.json(perfil);
  });
};


exports.alterar_perfil = function(req, res) {
  Perfil.findOneAndUpdate({_id: req.params.perfilId}, req.body, {new: true}, function(err, perfil) {
    if (err)
      res.send(err);
    res.json(perfil);
  });
};


exports.deletar_perfil = function(req, res) {


  Perfil.remove({
    _id: req.params.perfilId
  }, function(err, perfil) {
    if (err)
      res.send(err);
    res.json({ message: 'Perfil deletedo com sucesso.' });
  });
};
