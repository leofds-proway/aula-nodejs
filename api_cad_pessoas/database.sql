create database cad_pessoas;
use cad_pessoas;

create table pessoas (
	id int auto_increment,
	nome varchar(100) not null,
	telefone varchar(20),
	email varchar(150),
	estadoCivil int not null,
	primary key (id)
);

select * from pessoas;
insert into pessoas (nome, telefone, email, estadoCivil) values ('Leo', '47991112233', 'leo@gmail.com', 1);
insert into pessoas (nome, telefone, email, estadoCivil) values ('Ana', '47995552233', 'ana@gmail.com', 0);