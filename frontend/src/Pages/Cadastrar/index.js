import React, { Component } from 'react';
import Layout from '../../Components/Layout';
import FormCadastro from '../../Components/FormCadastro';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import { FormCadastroRequest } from '../../actions/cadastroActions';

import './style.scss';

class Cadastrar extends Component {
    render() {

        const { FormCadastroRequest } = this.props;

        return (
            <Layout>
                <section className="cadastrar">
                    <div className="cadastrar__item cadastrar__item--img"></div>
                    <div className="cadastrar__item cadastrar__item--form">
                    <h1 className="cadastrar__title">Faça seu cadastro</h1>
                        <FormCadastro 
                            FormCadastroRequest={FormCadastroRequest}
                        />
                    </div>
                </section>
            </Layout>
        )
    }
}

Cadastrar.propTypes = {
    FormCadastroRequest: PropTypes.func.isRequired
}

export default connect(null, { FormCadastroRequest })(Cadastrar);