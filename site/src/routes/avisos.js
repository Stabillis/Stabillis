var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
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

router.put("/desativar/:idMaquina", function (req, res) {
    avisoController.desativar(req, res);
});

module.exports = router;