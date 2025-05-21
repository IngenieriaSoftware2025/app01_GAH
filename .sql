CREATE TABLE categorias (
    categoria_id CHAR(1) PRIMARY KEY,
    categoria_nombre VARCHAR(50) NOT NULL
);

INSERT INTO categorias VALUES ('A', 'Alimentos');
INSERT INTO categorias VALUES ('H', 'Higiene');
INSERT INTO categorias VALUES ('C', 'Hogar');


CREATE TABLE prioridades (
    prioridad_id CHAR(1) PRIMARY KEY,
    prioridad_nombre VARCHAR(20) NOT NULL
);

INSERT INTO prioridades VALUES ('A', 'Alta');
INSERT INTO prioridades VALUES ('M', 'Media');
INSERT INTO prioridades VALUES ('B', 'Baja');


CREATE TABLE situaciones (
    situacion_id SMALLINT PRIMARY KEY,
    situacion_nombre VARCHAR(20) NOT NULL
);

INSERT INTO situaciones VALUES (1, 'Comprado');
INSERT INTO situaciones VALUES (0, 'Pendiente');


CREATE TABLE productos (
    producto_id SERIAL PRIMARY KEY,
    producto_nombre VARCHAR(100) NOT NULL,
    producto_cantidad INT NOT NULL,
    producto_categoria CHAR(1) NOT NULL REFERENCES categorias(categoria_id),
    producto_prioridad CHAR(1) NOT NULL REFERENCES prioridades(prioridad_id),
    producto_situacion SMALLINT DEFAULT 1 REFERENCES situaciones(situacion_id)
);
