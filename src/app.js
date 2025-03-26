import express from 'express';
import ConexaoDB from './conexao.js';
import cors from 'cors'; // Importe usando ES modules

const app = express();

// Configuração do CORS para desenvolvimento
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Permite apenas o seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

// Configuração do Body Parser (agora incorporado no Express)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Configurar rotas
app.get('/', function (req, res){
    res.send("API do estudante")
})

//Get student
app.get('/student', function (req, res){
    ConexaoDB.getAllStudents(function(student){
        res.json(student)
    })
})

//Get c/ parametro
app.get('/student/:nome', function (req,res){
    let nome = req.params.nome
    ConexaoDB.getStudentsByName(nome, function(student){
        res.json(student)
    })
})

// DELETE por ID na URL (mantenha apenas esta rota)
app.delete('/student/:id', function(req, res) {
    const id = req.params.id;
    ConexaoDB.delete(id, function(affectedRows) {
        if (affectedRows > 0) {
            res.json({ msg: 'Aluno apagado do registro' });
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    });
});



// POST corrigido (não deve receber ID no body)
app.post('/student', function(req, res) {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }
    ConexaoDB.save({ nome, email }, function(student) {
        res.status(201).json(student);
    });
});

// PUT para atualizar por ID na URL
app.put('/student/:id', function(req, res) {
    const student = {
        id: req.params.id,
        ...req.body
    };
    ConexaoDB.update(student, function(result) {
        res.json({ msg: 'Cadastro atualizado', affectedRows: result });
    });
});
//Iniciando o servidor
let server = app.listen(3000, function(){
    let host = server.address().address
    let port = server.address().port
    console.log("servidor iniciado em http://%s:%s", host, port)
})