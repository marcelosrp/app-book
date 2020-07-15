const express =  require('express');
const bodyParser = require('body-parser');
const connection = require('./database');

const usersController = require('./controllers/Users');
const lidosController = require('./controllers/Lidos');
const interessesController = require('./controllers/Interesses');
const authController = require('./controllers/Auth');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen('4000', () => console.log('API rodando na porta 4000'));

//Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão ao banco de dados realizada com sucesso.')
    })
    .catch((err) => {
        console.log(err, 'Erro conectar no banco de dados.')
    })

// Usando as rotas do controller de usuários e livros
app.use('/', usersController);
app.use('/', lidosController);
app.use('/', interessesController);
app.use('/', authController);













// Listagem de livros lidos
/* app.get('/livros/lidos', (req, res) => {
    res.statusCode = 200;
    res.json({ lidos: DB.lidos });
}); */

// Marcando um livro como lido
/* app.post('/livros/lidos', (req, res) => {

    const { title, author, thumb } = req.body;

    if(title === undefined || author === undefined || thumb === undefined) {
        res.status(400);
        res.json({ err: "Erro ao marcar o livro como lido. Tente novamente." });
        return;
    }

    if(title === null || author === null || thumb === null) {
        res.status(400);
        res.json({ err: "Erro ao marcar o livro como lido. Tente novamente." });
        return;
    }

    if(title === "" || author === "" || thumb === "") {
        res.status(400);
        res.json({ err: "Erro ao marcar o livro como lido. Tente novamente." });
        return;
    }

    DB.lidos.push({
        id: Date.now(),
        title,
        author,
        thumb
    });

    res.status(200);
    res.json({ success: "Livro lido com sucesso!" });
}); */

