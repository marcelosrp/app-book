const express = require('express');
const Users = require('../models/users');
const Lidos = require('../models/lidos');
const auth = require('../middlewares/auth');

const router = express.Router();

// Rota que pega todos os livros lidos de um usuário
router.get('/livros/lidos/:userId', auth, (req, res) => {
    
    const userId = req.params.userId

    Users
        .findOne({
            where: {
                id: userId
            }
        })
        .then(id => {
            if(id != undefined) {
                Lidos
                    .findAll({
                        where: {
                            userId: userId
                        }
                    })
                    .then(lidos => {
                        if(lidos.length === 0) {
                            res.status(200).json({ message: "Nenhum livro marcado como lido." });
                            return;
                        }

                        res.status(200).json({ lidos: lidos });
                    })
                    .catch(err => {
                        res.status(400).json({ err: "Erro ao listar os livros lidos" });
                    })
            }else{
                res.status(404).json( {message: "Usuário não encontrado." });
            }
        })
        .catch(err => {
            res.json({ err: err })
        })
});

// Rota que marca um livro como lido
router.post('/livros/lidos', (req, res) => {

    const { title, author, thumb, userId } = req.body;

    Lidos
        .findOne({
            where: {
                title: title
            }
        })
        .then(book => {
            if(book != undefined) {
                res.status(400).json({ err: "Livro já marcado como lido." });
                return;
            }

            Lidos
                .create({
                    title: title,
                    author: author,
                    thumb: thumb,
                    userId: userId
                })
                .then(() => {
                    res.status(200).json({ success: "Livro lido com sucesso!" });
                })
                .catch(err => {
                    res.status(400).json({ err: "Erro ao marcar o livro como lido. Tente novamente." });
                });
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });

});

module.exports = router;