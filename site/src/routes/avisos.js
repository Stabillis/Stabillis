var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listarMaquinas/:fkEmpresa", function (req, res) {
    avisoController.listarMaquinas(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/criarMaquina/", function (req, res) {
    avisoController.criarMaquina(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.get("/estadoMaquina/:idMaquina", function (req, res) {
    avisoController.estadoMaquina(req, res);
});

router.put("/desativarAtivar/", function (req, res) {
    avisoController.desativarAtivar(req, res);
});

module.exports = router;