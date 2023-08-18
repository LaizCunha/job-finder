const express   = require('express');
const app       = express();
const db        = require('./db/connection');
const bodyParser = require('body-parser');

const port = 3000;

app.listen(port, function() {
    console.log(`O Express está rodando na porta ${port}.`);
});

//BORY-PARSER
app.use(bodyParser.urlencoded({extend: false}));

//DB CONNECTION
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso!");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar.");
    });

//ROUTES
app.get('/', (req,res) => {
    res.send("A rota está funcionando.")
});

//JOBS ROUTES
app.use('./jobs')