import React from 'react';
import Layout from '../../Components/Layout';
import FormLogin from '../../Components/FormLogin'

import './style.scss';

const Login = () => (
    <Layout>
        <section className="login">
            <div className="login__item login__item--form">
                <h1 className="login__title">Faça seu login</h1>
                <FormLogin />
            </div>
            <div className="login__item login__item--img"></div>
        </section>
    </Layout>
);

export default Login;