var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM Usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuario WHERE Email = '${email}' AND Senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, telCel, senha, tipoUsuario, fkEmpresa) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, telefoneFixo, cep, complemento, cidade, cnpj, logradouro, bairro, estado);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (NomeUsuario, TelefoneCelular, Email, Senha, FK_Perfil, FK_Empresa) VALUES ('${nome}', '${telCel}', '${email}', '${senha}', '${tipoUsuario}', '${fkEmpresa}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(idUsuario) {
    var instrucao = `
    SELECT
        *
    FROM
        Usuario
    WHERE
        idUsuario = ${idUsuario};
    `
    return database.executar(instrucao)
}

function editarUsuario(idUsuario, nome, email, telefone, permissao) {
    var instrucao = `
    UPDATE
        Usuario
    SET
        NomeUsuario = ${nome},
        Email = ${email},
        TelefoneCelular = ${telefone},
        FK_Perfil = ${permissao}
    WHERE
        idUsuario = ${idUsuario}
    `
    return database.executar(instrucao)
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    editar,
    editarUsuario
};