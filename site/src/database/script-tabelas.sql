-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

create database Stabillis;

use Stabillis;

create table Empresa (
idEmpresa int primary key auto_increment,
NomeEmpresa varchar(45),
CNPJ char(14),
TelefoneFixo char(10),
CEP char(8),
Logradouro varchar(45),
Complemento varchar(45),
Bairro varchar(45),
Cidade varchar(45),
Estado varchar(45)
);

create table Colaborador (
idColaborador int primary key auto_increment,
NomeColaborador varchar(45),
TipoColaborador varchar(45),
email varchar(45),
TelefoneCelular varchar(45),
Senha varchar(45),
FK_Empresa int,
foreign key (FK_Empresa) references Empresa(idEmpresa)
);

create table Maquina (
idMaquina int primary key auto_increment,
NomeMaquina varchar(45),
SerialMaquina varchar(45),
IpMaquina varchar(45),
Localizacao varchar(45),
Departamento varchar(45),
Servidor varchar(45),
ProcessadorMaquina varchar(45),
MemoriaMaquina varchar(45),
DiscoMemoria varchar(45),
PlacaRede varchar(45),
SistemaOP varchar(45),
FK_Empresa int,
foreign key (FK_Empresa) references Empresa(idEmpresa)
);

create table Componente (
idComponente int primary key auto_increment,
UsoProcessador int,
FrequenciaProcessador double(10,2),
PacoteFísico int,
Download varchar(45),
Upload varchar(45),
DNS varchar(45),
VelocidadeConexao double(10,2),
NomeRede varchar(45),
EmUso varchar(45),
Disponível varchar(45),
TotalMemoria varchar(45),
NomeDisco varchar(45),
NumeroSerial varchar(45),
TempoDeTransferencia decimal(10,2),
TotalDisponivel varchar(45),
TotalDisco int,
SistemaOperacional varchar(45),
Arquitetura varchar(45),
FabricanteSistema varchar(45),
FabricanteProcessador varchar(45),
DataInicializado datetime,
TempoAtividade varchar(45),
Permissoes varchar(45),
Fk_Maquina int,
foreign key (FK_Maquina) references Maquina(idMaquina)
);


/*
comando para sql server - banco remoto - ambiente de produção
*/

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao VARCHAR(300)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
);

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
