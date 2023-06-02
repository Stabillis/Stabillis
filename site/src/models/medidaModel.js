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
        capacidadeMaxDisco,
        capacidadeMaxRAM,
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
            FK_Maquina
        FROM (
        SELECT
            cap.usoRAM,
            cap.usoCPU,
            cap.usoDisco,
            cap.FK_Maquina,
            maq.capacidadeMaxRAM,
            maq.capacidadeMaxCPU,
            maq.capacidadeMaxDisco,
        ROW_NUMBER() OVER (PARTITION BY FK_Maquina ORDER BY dataHora DESC) AS rn
          FROM [dbo].[Captura] as cap
            join [dbo].[Maquina] as maq
            on cap.FK_Maquina = maq.idMaquina
            where maq.FK_Empresa = ${fkEmpresa}
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
