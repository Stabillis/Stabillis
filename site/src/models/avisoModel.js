var database = require("../database/config");

function listar(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        select m.idMaquina,
        m.nomeMaquina,
        m.FK_Status,
        m.FK_Empresa  
        from Maquina as m
        inner join Empresa as e
        on e.idEmpresa = m.FK_Empresa
        where m.FK_Empresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinas(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        select m.idMaquina,
        m.nomeMaquina,
        m.FK_Status,
        m.FK_Empresa  
        from Maquina as m
        inner join Empresa as e
        on e.idEmpresa = m.FK_Empresa
        where m.FK_Empresa = ${fkEmpresa} and 
        FK_Status = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function maquinaComMaiorCPU(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT 
    m.nomeMaquina,
    c.usoCPU
    FROM Captura as c 
    join [dbo].[Maquina] as m 
    on m.idMaquina = c.FK_Maquina 
    WHERE FORMAT(dataHora, 'HH:mm:ss') >= DATEADD(HOUR, -24, FORMAT(GETDATE(), 'HH:mm:ss')) and 
    m.FK_Empresa = ${fkEmpresa}
    order by c.usoCPU desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function maquinaComMaiorRAM(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT m.nomeMaquina, 
    c.usoRAM
    FROM Captura as c 
    join [dbo].[Maquina] as m 
    on m.idMaquina = c.FK_Maquina 
    WHERE FORMAT(dataHora, 'HH:mm:ss') >= DATEADD(HOUR, -24, FORMAT(GETDATE(), 'HH:mm:ss')) and 
    m.FK_Empresa = ${fkEmpresa}
    order by c.usoRAM desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function maquinaComMaiorDisco(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT m.nomeMaquina, c.usoDisco, m.capacidadeMaxDisco
    FROM Captura as c 
    join [dbo].[Maquina] as m 
    on m.idMaquina = c.FK_Maquina 
    WHERE FORMAT(dataHora, 'HH:mm:ss') >= DATEADD(HOUR, -24, FORMAT(GETDATE(), 'HH:mm:ss')) and 
    m.FK_Empresa = ${fkEmpresa}
    order by c.usoDisco desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function maquinaMaisSobrecarregada(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT 
    m.nomeMaquina,
    (m.capacidadeMaxRAM - m.usoRAM) as disponivelRAM,
    (m.capacidadeMaxCPU - m.usoCPU) as disponivelCPU,
    (m.capacidadeMaxDisco - m.usoDisco) as disponivelDisco,
    c.dataHora,
    FORMAT(dataHora, 'HH:mm:ss')
    FROM Captura as c 
    join [dbo].[Maquina] as m 
    on m.idMaquina = c.FK_Maquina 
    WHERE FORMAT(dataHora, 'HH:mm:ss') >= DATEADD(HOUR, -24, FORMAT(GETDATE(), 'HH:mm:ss')) and 
    m.FK_Empresa = ${fkEmpresa}
    order by c.usoDisco desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function criarMaquina(nomeMaquina, fkStatus, capacidadeRAM, capacidadeDisco, capacidadeCPU
    , arquitetura, sistemaOperacional, fkEmpresa) {
    // console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, descricao, idUsuario);
    var instrucao = `
        INSERT INTO Maquina (nomeMaquina, FK_Status, capacidadeMaxRAM, capacidadeMaxDisco, capacidadeMaxCPU
        , Arquitetura, SistemaOperacional, FK_Empresa) VALUES (
            '${nomeMaquina}', '${fkStatus}', '${capacidadeRAM}', '${capacidadeDisco}', '${capacidadeCPU}'
            , '${arquitetura}', '${sistemaOperacional}', '${fkEmpresa}'
        );
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucao = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarMaquina(nomeMaquina, capacidadeRAM, capacidadeDisco, capacidadeCPU
    , arquitetura, sistemaOperacional, idMaquina) {
    var instrucao = `
        UPDATE 
            Maquina 
        SET nomeMaquina = '${nomeMaquina}',
            capacidadeMaxRAM = ${capacidadeRAM}, 
            capacidadeMaxDisco = ${capacidadeDisco} , 
            capacidadeMaxCPU = ${capacidadeCPU},
            arquitetura = '${arquitetura}',
            sistemaOperacional = '${sistemaOperacional}' 
        WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function estadoMaquina(idMaquina) {
    var instrucao = `
        select * from Maquina where idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function desativarAtivar(idMaquina, fkStatus) {
    var instrucao = `
        update Maquina set FK_Status = ${fkStatus} where idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getMaquinaById(idMaquina) {
    var instrucao = `
    select nomeMaquina, capacidadeMaxRAM, capacidadeMaxDisco, capacidadeMaxCPU, Arquitetura, SistemaOperacional, Fk_Empresa from Maquina where idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarMaquinas,
    maquinaComMaiorCPU,
    maquinaComMaiorRAM,
    maquinaComMaiorDisco,
    maquinaMaisSobrecarregada,
    listarPorUsuario,
    pesquisarDescricao,
    criarMaquina,
    editar,
    estadoMaquina,
    desativarAtivar,
    getMaquinaById,
    editarMaquina
}
