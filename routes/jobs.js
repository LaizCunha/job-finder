const express = require('express');
const router  = express.Router();
const Job     = require('../models/Job');


// ROTA DE TESTE
router.get('/test', (req, res) => {
   res.send("deu certo");
});


// BUSCA

router.get('/add', (req, res) => {
   res.render("add.handlebars");
})

// ADICIONAR JOB VIA POST

router.post('/add', (req, res) => {
    
   let {title, description, salary, company, email, new_job} = req.body;

//INSERT
   Job.create({
    title, 
    description, 
    salary, 
    company, 
    email, 
    new_job
   })
   .then(() => res.redirect('/'))
   .catch(err => console.log(err));

});

module.exports = router;