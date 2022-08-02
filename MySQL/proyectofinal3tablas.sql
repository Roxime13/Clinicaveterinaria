use proyectofinal;
create database proyectofinal;
drop database proyectofinal;

create table clientes(
id INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL,
primer_Apellido VARCHAR(50) NOT NULL,
segundo_Apellido VARCHAR(50) NULL,
edad INT NOT NULL,
poblacion VARCHAR(80) NOT NULL,
direccion VARCHAR(85) NOT NULL,
telefono VARCHAR(70) NULL,
correo VARCHAR(60) NOT NULL,
PRIMARY KEY(id)
);

select * from clientes;

create table Mascotas(
id INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL,
especie VARCHAR(60)NOT NULL,
edad INT NOT NULL,
sexo VARCHAR(60) NOT NULL,
id_fk INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (id_fk) REFERENCES clientes(id)
);

select * from Mascotas;

insert into Mascotas(nombre, especie, edad, sexo, id_fk) values ('Pili', 'Perro', '4', 'Femenino', 2);

drop table Mascotas;

create table Tratamientos(
id INT NOT NULL AUTO_INCREMENT,
nombre_veterinario VARCHAR(80) NOT NULL,
sintomas TEXT NOT NULL,
id_fkmascotas INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (id_fkmascotas) REFERENCES Mascotas(id)
);
select * from tratamientos;
drop table Tratamientos;

insert into Tratamientos(nombre_veterinario, sintomas,  id_fkmascotas) values ('Marisa', 'Le duele la barriga', 2);

