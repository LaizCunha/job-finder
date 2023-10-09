const express               = require('express');
const app                   = express();
const exphbs                = require('express-handlebars');
const path                  = require('path');
const db                    = require('./db/connection');
const bodyParser            = require('body-parser');
const Job                   = require('./models/Job');
const { ExpressHandlebars } = require('express-handlebars');
const Sequelize             = require('sequelize');
const Op                    = Sequelize.Op;


const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O Express está rodando na porta ${PORT}.`);
});

//BORY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));

//DB CONNECTION
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso!");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar.");
    });

//HANDLE BARS
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main.handlebars'}));
app.set('view engine', 'handlebars');

//ROUTES
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%'+search+'%';
    
    if(!search) {

        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            
            res.render('index.handlebars', {
                jobs
            });
        })
        .catch(err => console.log(err));

    } else {
        Job.findAll({
            
            where: {title: {[Op.like]: query}},            
            order: [
                ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            
            res.render('index.handlebars', {
                jobs, search
            });
        })
        .catch(err => console.log(err));
    }
    
});

//STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

//JOBS ROUTES
app.use('/jobs', require('./routes/jobs'));
