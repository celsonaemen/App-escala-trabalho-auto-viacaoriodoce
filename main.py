from flask import Flask, request

app = Flask(__name__)

# Página inicial
@app.route("/")
def home():
    return '''
        <h1>Bem-vindo ao Gerenciador de Escalas</h1>
        <a href="/add_person">Cadastrar Motoristas e Cobradores</a>
    '''

# Página para adicionar motoristas e cobradores
@app.route("/add_person", methods=["GET", "POST"])
def add_person():
    if request.method == "POST":
        # Capturar dados do formulário
        role = request.form["role"]
        name = request.form["name"]
        matricula = request.form["matricula"]
        return f"<h2>{role.capitalize()} {name} com matrícula {matricula} cadastrado!</h2>"
    
    # Formulário para cadastro
    return '''
        <h1>Cadastro de Motoristas e Cobradores</h1>
        <form method="post">
            Tipo:
            <select name="role">
                <option value="motorista">Motorista</option>
                <option value="cobrador">Cobrador</option>
            </select>
            <br><br>
            Nome: <input type="text" name="name" required>
            <br><br>
            Matrícula: <input type="text" name="matricula" required>
            <br><br>
            <button type="submit">Cadastrar</button>
        </form>
    '''

if __name__ == "__main__":
    app.run(debug=True)
 
 