var database = require("../database/config");

function buscarUltimasMedidas(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} 
        bytesRecebidos,
        bytesEnviados,
        usoRAM, 
        usoCPU, 
        usoDisco,
        (capacidadeMaxDisco - usoDisco) as disponivelDisco,
        (capacidadeMaxRAM - usoRAM) as disponivelRAM,
        tempoAtividade,
        dataHora,
                        FORMAT(dataHora, 'HH:mm:ss') as dh
                    from Captura join Maquina on 
                    idMaquina = FK_Maquina 
                    where idMaquina = ${idMaquina}
                    order by idCaptura desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select pacotesRecebidos, pacotesEnviados, DATE_FORMAT (dataHora, '%H:%i:%s') as dh, idMaquina from Captura c 
        join Maquina m on m.idMaquina = c.FK_Maquina where idMaquina = ${idMaquina} order by idCaptura desc limit ${limite_linhas} ;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 
        bytesRecebidos,
        bytesEnviados,
        usoRAM, 
        usoCPU, 
        usoDisco,
        (capacidadeMaxRAM - usoRAM) as disponivelRAM, 
        (capacidadeMaxCPU - usoCPU) as disponivelCPU, 
        (capacidadeMaxDisco - usoDisco) as disponivelDisco,
        tempoAtividade,
        dataHora,
                        FORMAT(dataHora, 'HH:mm:ss') as dh
                    from Captura join Maquina on 
                    idMaquina = FK_Maquina 
                    where idMaquina = ${idMaquina}
                    order by idCaptura desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealGeral(fkEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        usoRAM,
        usoCPU, 
        usoDisco,
        FK_Maquina,
        maximoRAM,
        moderadoRAM,
        maximoCPU,
        moderadoCPU,
        maximoDisco,
        moderadoDisco
    FROM (
    SELECT
        cap.usoRAM,
        cap.usoCPU,
        cap.usoDisco,
        cap.FK_Maquina,
        lim.maximoRAM,
        lim.moderadoRAM,
        lim.maximoCPU,
        lim.moderadoCPU,
        lim.maximoDisco,
        lim.moderadoDisco,
    ROW_NUMBER() OVER (PARTITION BY FK_Maquina ORDER BY dataHora DESC) AS rn
      FROM [dbo].[Captura] as cap
        join [dbo].[Maquina] as maq
        on cap.FK_Maquina = maq.idMaquina
        join [dbo].[Empresa] as emp
        on maq.FK_Empresa = emp.idEmpresa
        join [dbo].[Limite] as lim
        on lim.FK_Empresa = emp.idEmpresa
        where maq.FK_Empresa = ${fkEmpresa} and 
        maq.FK_Status = 1
    ) AS subquery
    WHERE rn = 1;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasEmTempoRealGeral
}
