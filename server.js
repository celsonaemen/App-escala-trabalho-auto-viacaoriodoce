// Importando os módulos necessários
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Criando uma instância do Express
const app = express();

// Configurando o banco de dados SQLite
const db = new sqlite3.Database('./escala.db', (err) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados:", err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Middleware para processar o corpo das requisições como JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Criando as tabelas caso não existam
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS motoristas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cnh TEXT NOT NULL
    );
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS trocadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS itinerarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      de TEXT NOT NULL,
      para TEXT NOT NULL,
      horario_saida TEXT NOT NULL
    );
  `);
});

// Rota para cadastrar um motorista
app.post('/motoristas', (req, res) => {
  const { nome, cnh } = req.body;

  // Verifica se os campos estão presentes
  if (!nome || !cnh) {
    return res.status(400).send('Nome e CNH são obrigatórios.');
  }

  const stmt = db.prepare('INSERT INTO motoristas (nome, cnh) VALUES (?, ?)');
  stmt.run(nome, cnh, function(err) {
    if (err) {
      return res.status(500).send('Erro ao cadastrar motorista');
    }
    res.status(200).send(`Motorista cadastrado com sucesso. ID: ${this.lastID}`);
  });
  stmt.finalize();
});

// Rota para cadastrar um trocador
app.post('/trocadores', (req, res) => {
  const { nome } = req.body;

  // Verifica se o nome está presente
  if (!nome) {
    return res.status(400).send('Nome do trocador é obrigatório.');
  }

  const stmt = db.prepare('INSERT INTO trocadores (nome) VALUES (?)');
  stmt.run(nome, function(err) {
    if (err) {
      return res.status(500).send('Erro ao cadastrar trocador');
    }
    res.status(200).send(`Trocador cadastrado com sucesso. ID: ${this.lastID}`);
  });
  stmt.finalize();
});

// Rota para cadastrar um itinerário
app.post('/itinerarios', (req, res) => {
  const { de, para, horario_saida } = req.body;

  // Verifica se os dados necessários estão presentes
  if (!de || !para || !horario_saida) {
    return res.status(400).send('Todos os campos (de, para e horário) são obrigatórios.');
  }

  const stmt = db.prepare('INSERT INTO itinerarios (de, para, horario_saida) VALUES (?, ?, ?)');
  stmt.run(de, para, horario_saida, function(err) {
    if (err) {
      return res.status(500).send('Erro ao cadastrar itinerário');
    }
    res.status(200).send(`Itinerário cadastrado com sucesso. ID: ${this.lastID}`);
  });
  stmt.finalize();
});

// Rota para obter todos os motoristas cadastrados
app.get('/motoristas', (req, res) => {
  db.all('SELECT * FROM motoristas', (err, rows) => {
    if (err) {
      return res.status(500).send('Erro ao buscar motoristas');
    }
    res.status(200).json(rows);
  });
});

// Rota para obter todos os trocadores cadastrados
app.get('/trocadores', (req, res) => {
  db.all('SELECT * FROM trocadores', (err, rows) => {
    if (err) {
      return res.status(500).send('Erro ao buscar trocadores');
    }
    res.status(200).json(rows);
  });
});

// Rota para obter todos os itinerários cadastrados
app.get('/itinerarios', (req, res) => {
  db.all('SELECT * FROM itinerarios', (err, rows) => {
    if (err) {
      return res.status(500).send('Erro ao buscar itinerários');
    }
    res.status(200).json(rows);
  });
});

// Iniciando o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
