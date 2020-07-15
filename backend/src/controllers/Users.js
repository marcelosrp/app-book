const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const validateUser = require('../middlewares/validate');

const router = express.Router();

// Listagem de usuários
router.get('/users', (req, res) => {
    User
        .findAll()
        .then(users => {
            if(users.length === 0) {
                res.status(200);
                res.json({ message: "Nenhum usuário encontrado." });
                return;
            }

            res.status(200);
            res.json({ users: users });
        })
        .catch(err => {
            res.status(400);
            res.json({ err: "Erro ao listar os usários" });
        })
});

// Cadastro de usuário
router.post('/users', validateUser, (req, res) => {

    const { name, email, password } = req.body;
    
    User
        .findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if(user != undefined) {
                res.status(400).json({ err: "E-mail já cadastrado no sistema" });
                return;
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            User
                .create({
                    name: name,
                    email: email,
                    password: hash
                })
                .then(() => {
                    res.status(200).json({ success: "Cadastro realizado com sucesso" });
                })
                .catch(err => {
                    res.status(400).json({ err: "Erro ao realizar o cadastro. Tente novamente." });
                })

        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
});

module.exports = router;