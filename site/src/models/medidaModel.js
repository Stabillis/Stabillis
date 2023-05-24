var database = require("../database/config");

function buscarUltimasMedidas(idMaquina,limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} 
        pacotesRecebidos,
        pacotesEnviados,
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
        pacotesRecebidos,
        pacotesEnviados,
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
    buscarMedidasEmTempoReal
}
