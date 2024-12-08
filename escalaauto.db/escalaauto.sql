-- Criação do banco de dados
-- Cria o banco de dados escalaauto.db (isso é feito quando você rodar o código Flask com SQLite)

-- Criação da tabela Motorista
CREATE TABLE IF NOT EXISTS motorista (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula TEXT UNIQUE NOT NULL,
    denominacao TEXT NOT NULL -- 'fixo' ou 'rodizio'
);

-- Criação da tabela Trocador
CREATE TABLE IF NOT EXISTS trocador (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula TEXT UNIQUE NOT NULL,
    denominacao TEXT NOT NULL -- 'fixo' ou 'rodizio'
);

-- Criação da tabela Escala
CREATE TABLE IF NOT EXISTS escala (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    motorista_id INTEGER NOT NULL,
    trocador_id INTEGER NOT NULL,
    data DATE NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL,
    FOREIGN KEY (motorista_id) REFERENCES motorista(id),
    FOREIGN KEY (trocador_id) REFERENCES trocador(id)
);

-- Tabela de Linha
CREATE TABLE IF NOT EXISTS linha (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    origem TEXT NOT NULL,
    destino TEXT NOT NULL,
    horarios TEXT -- Coloque os horários de saída e chegada aqui
);
