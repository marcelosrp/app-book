const validateUser = (req, res, next) => {

    const { name, email, password } = req.body;

    if(name === "") {
        res.status(400).json({ err: "O campo nome deve ser preenchido." });
        return;
    }

    if(email === "") {
        res.status(400).json({ err: "O campo email deve ser preenchido." });
        return;
    }

    if(password === "") {
        res.status(400).json({ err: "O campo senha deve ser preenchido." });
        return;
    }

    if(name === "" && email === "" && password === "") {
        res.status(400).json({ err: "Todos os campos devem ser preenchidos corretamente." });
        return;
    }

    if(!validateEmail(email)) {
        res.status(400).json({ err: "Digite um email válido." });
        return;
    }

    next();
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = validateUser;