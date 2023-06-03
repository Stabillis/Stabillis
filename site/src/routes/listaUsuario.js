var express = require("express");
var router = express.Router();

var listaUsuarioController = require("../controllers/listaUsuarioController");


router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    listaUsuarioController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    listaUsuarioController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/criarUsuario/", function (req, res) {
    listaUsuarioController.criarUsuario(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/desativar/:idUsuario", function (req, res) {
    listaUsuarioController.desativar(req, res);
});


router.get("/estadoPerfilUsuario/:idUsuario", function (req, res) {
    listaUsuarioController.estadoPerfilUsuario(req, res);
});
router.put("/desativarAtivar/", function (req, res) {
    listaUsuarioController.desativarAtivar(req, res);
});



module.exports = router;