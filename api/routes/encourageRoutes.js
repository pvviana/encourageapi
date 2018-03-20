'use strict';
module.exports = function(app) {
  var encourageApp = require('../controllers/encourageController');

  // encourageApp Routes
  app.route('/perfils')
    .get(encourageApp.listar_todos_perfils)
    .post(encourageApp.criar_perfil);


  app.route('/perfils/:perfilId')
    .get(encourageApp.ler_perfil)
    .put(encourageApp.alterar_perfil)
    .delete(encourageApp.deletar_perfil);
};
