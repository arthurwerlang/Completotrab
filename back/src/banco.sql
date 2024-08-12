CREATE DATABASE reciclagem_db;

USE reciclagem_db;

-- tabela de materiais
CREATE TABLE materiais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

-- tabela de locais de descarte
CREATE TABLE locais_descarte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);

-- tabela de lig entre materiais e locais de descarte
CREATE TABLE materiais_locais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    material_id INT,
    local_id INT,
    FOREIGN KEY (material_id) REFERENCES materiais(id),
    FOREIGN KEY (local_id) REFERENCES locais_descarte(id)
);

-- Insere dados na tabela de materiais
INSERT INTO materiais (nome) VALUES
('Metal'),
('Plástico'),
('Papel'),
('Eletrônico');

-- Insere dados na tabela de locais de descarte
INSERT INTO locais_descarte (nome, endereco) VALUES
('Ecofab Reciclagem', 'Rua Orquídeas, 05 - Vicentina, São Leopoldo - RS'),
('Associação dos Trabalhadores Urbanos de Reciclaveis Orgânicos', 'R. Arno Schuch, 466 - Vicentina, São Leopoldo - RS'),
('Sucatas Leopoldense', 'Avenida. João Corrêa, 3510 - Vicentina, São Leopoldo - RS'),
('Rssulcatta', 'Rua luís Pedro Daudt, 664 - São Miguel, São Leopoldo - RS'),
('Reciclagem Daniquel', 'Rua Luís Pedro Daudt, 664, São Miguel, São Leopoldo - RS'),
('Everplast Me', 'Rua Luís Pedro Daudt, 664 - São Miguel, São Leopoldo - RS'),
('Reciclaclagem', 'Rua 6 - Santa Marta, São Leopoldo - RS'),
('Hamburgo Reciclagem', 'R. Palma, 80 - Liberdade, Novo Hamburgo - RS'),
('Sinosfer Comércio de Metais', 'R. Rio São Francisco, 125 - Jardim Luciana, São Leopoldo - RS'),
('Metalbrás', 'Av. Leopoldo Wasun - Santos Dumont, São Leopoldo - RS');

-- Associa materiais aos locais de descarte

-- Associação para Metal
INSERT INTO materiais_locais (material_id, local_id) VALUES
(1, 1),  -- Metal -> Ecofab Reciclagem
(1, 3),  -- Metal -> Sucatas Leopoldense
(1, 9),  -- Metal -> Sinosfer Comércio de Metais
(1, 10); -- Metal -> Metalbrás

-- Associação para Plástico
INSERT INTO materiais_locais (material_id, local_id) VALUES
(2, 1),  -- Plástico -> Ecofab Reciclagem
(2, 5),  -- Plástico -> Reciclagem Daniquel
(2, 6);  -- Plástico -> Everplast Me

-- Associação para Papel
INSERT INTO materiais_locais (material_id, local_id) VALUES
(3, 2),  -- Papel -> Associação dos Trabalhadores Urbanos de Reciclaveis Orgânicos
(3, 7),  -- Papel -> Reciclaclagem
(3, 8);  -- Papel -> Hamburgo Reciclagem

-- Associação para Eletrônico
INSERT INTO materiais_locais (material_id, local_id) VALUES
(4, 4);  -- Eletrônico -> Rssulcatta


-- Consulta que recomenda locais específicos com base no material
SELECT m.nome AS Material, l.nome AS Local, l.endereco AS Endereco
FROM materiais m
JOIN materiais_locais ml ON m.id = ml.material_id
JOIN locais_descarte l ON l.id = ml.local_id
WHERE l.endereco LIKE '%São Leopoldo%'


