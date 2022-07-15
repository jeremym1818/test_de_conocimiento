
CREATE DATABASE db_Gestion;

USE db_Gestion;

-- TABLE USUARIO
-- todas las contraseñas se cifrarán con SHA1

CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  name VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL
);


ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

SELECT * FROM users;
SELECT * FROM gestion;
SELECT * FROM gestioncliente;

-- Tabla Gestion
CREATE TABLE gestion (
  id INT(11) NOT NULL,
  name VARCHAR(150) NOT NULL,
  description BOOLEAN,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE gestion
  ADD PRIMARY KEY (id);

ALTER TABLE gestion
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


DESCRIBE gestion

-- Tabla GestionCliente
CREATE TABLE gestioncliente (
  id INT(11) NOT NULL,
  gestion_id INT(11),
  atendido VARCHAR(50) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_gestion FOREIGN KEY(gestion_id) REFERENCES gestion(id)
);

ALTER TABLE gestioncliente
  ADD PRIMARY KEY (id);

ALTER TABLE gestioncliente
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

 alter table gestioncliente add nombreG VARCHAR(50) NOT NULL;
 alter table gestioncliente add user_id INT(11) NOT NULL;
DESCRIBE gestioncliente