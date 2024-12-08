from app import create_app
from app.database import init_db

app = create_app()

if __name__ == '__main__':
    init_db()  # Criar as tabelas no banco de dados
    app.run(debug=True)