const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const JWTSecret = 'jhwiufwehifbqjkk68768gjctrd';
const router = express.Router();

// Login
router.post('/auth', (req, res) => {

    const { email, password } = req.body;

    if(email === "" && password === "") {
        res.status(400).json({ err: "Os campos devem ser preenchidos corretamente." });
        return;
    }

    if(email === "") {
        res.status(400).json({ err: "O campo email não pode ser vazio." });
        return;
    }

    if(password === "") {
        res.status(400).json({ err: "O campo senha não pode ser vazio." });
        return;
    }

    User
        .findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            
            if(user === null) {
                res.status(401).json({ err: "E-mail não cadastrado no sistema." });
                return;
            }

            const correct = bcrypt.compareSync(password, user.password);

            if(correct) {
                jwt.sign({ id: user.id, name: user.name, email: user.email }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                    if(err) {
                        res.status(400).json({ err: "Falha interna" });
                        return;
                    }
            
                    res.status(200).json({ token: token });
                });
            }else{
                res.status(401).json({ err: "Senha incorreta, tente novamente." });
            }
        })
        .catch(err => {
            console.log(err.response);
        });
});

module.exports = router;