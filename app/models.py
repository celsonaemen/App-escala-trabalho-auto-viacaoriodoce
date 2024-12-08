from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Motorista(db.Model):
    __tablename__ = 'motoristas'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    matricula = db.Column(db.String(50), nullable=False, unique=True)

class Trocador(db.Model):
    __tablename__ = 'trocadores'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)

class Horario(db.Model):
    __tablename__ = 'horarios'

    id = db.Column(db.Integer, primary_key=True)
    horario = db.Column(db.String(50), nullable=False)

    motorista_id = db.Column(db.Integer, db.ForeignKey('motoristas.id'), nullable=False)
    trocador_id = db.Column(db.Integer, db.ForeignKey('trocadores.id'), nullable=False)

    motorista = db.relationship('Motorista', backref='horarios', lazy=True)
    trocador = db.relationship('Trocador', backref='horarios', lazy=True)
