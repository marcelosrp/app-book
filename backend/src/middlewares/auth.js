const jwt = require('jsonwebtoken');
const JWTSecret = 'jhwiufwehifbqjkk68768gjctrd';

const auth = (req, res, next) => {
    const authToken = req.headers['authorization'];

    if(authToken === undefined) {
        res.status(403).json({ err: "Token inválido" });
        return;
    }

    const bearer = authToken.split(' ');
    const token = bearer[1];

    jwt.verify(token, JWTSecret, (err, data) => {
        if(err) {
            res.status(401).send({ err: "Token inválido" });
            return;
        }

        req.token = token;

        req.loggedUser = { 
            id: data.id, 
            name: data.name, 
            email: data.email
        };
        
        next();
    });
}

module.exports = auth;