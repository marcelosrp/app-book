import React from 'react';
import { Switch, Route } from 'react-router-dom';
import requireAuth from '../utils/requireAuth';

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Cadastrar from '../Pages/Cadastrar';
import Livros from '../Pages/Livros';
import Busca from '../Pages/Busca';

const Routes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/cadastrar" exact component={Cadastrar} />
        <Route path="/busca/:q" exact component={Busca} />
        <Route path="/meus-livros" exact component={requireAuth(Livros)} />
    </Switch>
)


export default Routes;