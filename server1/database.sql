create database teste;
use teste;

create table pessoa (
	id int auto_increment,
	nome varchar(50),
    primary key (id)
);

select * from pessoa;
insert into pessoa (nome) values ('Leo');
insert into pessoa (nome) values ('Ana');