const express = require('express');
const Users = require('../models/users');
const Interesses = require('../models/interesses');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/livros/interesses/:userId', auth, (req, res) => {
    
    const userId = req.params.userId;

    Users
        .findOne({
            where: {
                id: userId
            }
        })
        .then(id => {
            if(id != undefined) {
                Interesses
                    .findAll({
                        where: {
                            userId: userId
                        }
                    })
                    .then(interesses => {
                        
                        if(interesses.length === 0) {
                            res.status(200).json({ message: "Nenhum livro marcado como interessado." });
                            return;
                        }
                        
                        res.status(200).json({ interesses: interesses });
                    })
                    .catch(err => {
                        res.status(400).json({ err: "Erro ao listar os livros marcado como interesse" });
                    })

            }else{
                res.status(404).json({ message: "Usuário não encontrado." });
            }

        })
        .catch(err => {
            res.json({ err: err });
        })
});

router.post('/livros/interesses', (req, res) => {

    const { title, author, thumb, userId } = req.body;

    Interesses
        .findOne({
            where: {
                title: title
            }
        })
        .then(book => {
            if(book != undefined) {
                res.status(400).json({ err: "Livro já marcado como quero ler." });
                return;
            }

            Interesses
                .create({
                    title: title,
                    author: author,
                    thumb: thumb,
                    userId: userId
                })
                .then(() => {
                    res.status(200).json({ success: "Livro marcado como interesse com sucesso" });
                })
                .catch(err => {
                    res.status(400).json({ err: "Erro ao marcar o livro como interesse. Tente novamente." });
                });
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });

});

module.exports = router;