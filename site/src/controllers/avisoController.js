var avisoModel = require("../models/avisoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO avisoController");
    res.send("ENTRAMOS NO AVISO CONTROLLER");
}

function listar(req, res) {
    avisoModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    avisoModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function criarMaquina(req, res) {
    var nomeMaquina = req.body.nomeMaquinaServer;
    var fkStatus = req.body.fkStatusServer;
    var capacidadeRAM = req.body.capacidadeRAMServer;
    var capacidadeDisco = req.body.capacidadeDiscoServer
    var frequenciaCPU = req.body.frequenciaCPUServer
    var arquitetura = req.body.arquiteturaServer
    var sistemaOperacional = req.body.sistemaOperacionalServer
    var fkEmpresa = req.body.fkEmpresaServer

    if (nomeMaquina == undefined) {
        res.status(400).send("O nome da máquina está indefinido!");
    } else if (fkStatus == undefined) {
        res.status(400).send("A fkStatus está indefinida!");
    } else if (capacidadeRAM == undefined) {
        res.status(400).send("A capacidade da RAM está indefinido!");
    } else if (capacidadeDisco == undefined) {
        res.status(400).send("A capacidade do disco está indefinido!");
    } else if (frequenciaCPU == undefined) {
        res.status(400).send("A frequência da CPU está indefinido!");
    } else if (arquitetura == undefined) {
        res.status(400).send("A arquitetura está indefinido!");
    } else if (sistemaOperacional == undefined) {
        res.status(400).send("O SO está indefinido!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está indefinido!");
    } else {
        avisoModel.criarMaquina(nomeMaquina, fkStatus, capacidadeRAM, capacidadeDisco, frequenciaCPU
            , arquitetura, sistemaOperacional, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var novaDescricao = req.body.descricao;
    var idAviso = req.params.idAviso;

    avisoModel.editar(novaDescricao, idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function desativar(req, res) {
    var idMaquina = req.params.idMaquina;

    avisoModel.desativar(idMaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    testar,
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    criarMaquina,
    editar,
    desativar
}