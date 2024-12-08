from flask import Blueprint

routes = Blueprint('routes', __name__)

@routes.route('/add_horario', methods=['POST'])
def add_horario():
    # Lógica para adicionar horário
    pass
