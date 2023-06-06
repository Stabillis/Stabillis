var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var nome = req.body.nomeUsuarioServer;
    var email = req.body.emailServer;
    var telCel = req.body.telCelServer;
    var senha = req.body.senhaServer;
    var tipoUsuario = req.body.tipoUsuarioServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telCel == undefined) {
        res.status(400).send("Seu telefone celular está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (tipoUsuario == undefined) {
        res.status(400).send("Seu tipo de colaborador está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A empresa do colaborador está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, telCel, senha, tipoUsuario, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function alterarSenha(req, res) {
    var idUsuario = req.params.idUsuario
    var novaSenha = req.body.novaSenha

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!")
    } else if (novaSenha == undefined) {
        res.status(400).send("A nova senha está undefined!")
    } else {
        usuarioModel.alterarSenha(idUsuario, novaSenha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao alterar a senha! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var idUsuario = req.params.idUsuario

    usuarioModel.editar(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length == 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editarUsuario(req, res) {
    var idUsuario = req.params.idUsuario
    var nome = req.body.nomeUsuarioServer
    var email = req.body.emailServer
    var telefone = req.body.telefoneServer
    var permissao = req.body.permissaoServer

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("O email está indefinido!");
    } else if (telefone == undefined) {
        res.status(400).send("O telefone está indefinido!");
    } else if (permissao == undefined) {
        res.status(400).send("A permissao está indefinido!");
    } else {
        usuarioModel.editarUsuario(idUsuario, nome, email, telefone, permissao)
            .then(
                function (resultado) {
                    if (resultado.length == 1) {
                        console.log('entrei no if da function(resultado)')
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao editar o usuario! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    alterarSenha,
    listar,
    testar,
    editarUsuario,
    editar
}