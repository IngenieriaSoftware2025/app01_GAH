create database guzman

CREATE TABLE categorias (
    categoria_id SERIAL PRIMARY KEY,
    categoria_nombre VARCHAR(50) NOT NULL
);
INSERT INTO categorias (categoria_nombre) VALUES ('Alimentos');
INSERT INTO categorias (categoria_nombre) VALUES ('Higiene');
INSERT INTO categorias (categoria_nombre) VALUES ('Hogar');


CREATE TABLE prioridades (
    prioridad_id SERIAL PRIMARY KEY,
    prioridad_nombre VARCHAR(20) NOT NULL
);
INSERT INTO prioridades (prioridad_nombre) VALUES ('Alta');
INSERT INTO prioridades (prioridad_nombre) VALUES ('Media');
INSERT INTO prioridades (prioridad_nombre) VALUES ('Baja');

CREATE TABLE productos (
    producto_id SERIAL PRIMARY KEY,
    producto_nombre VARCHAR(100) NOT NULL,
    producto_cantidad INT NOT NULL,
    producto_categoria INT NOT NULL REFERENCES categorias(categoria_id),
    producto_prioridad INT NOT NULL REFERENCES prioridades(prioridad_id),
    producto_situacion SMALLINT DEFAULT 1 -- 1=pendiente, 0=comprado
);