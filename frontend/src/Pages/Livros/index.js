import React, { Component } from 'react';
import Layout from '../../Components/Layout';
import LivrosLidos from '../../Components/LivrosLidos';
import LivrosInteresses from '../../Components/LivrosInteresses';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class MeusLivros extends Component {
    render() {

        const { user } = this.props.auth;

        return (
            <Layout>
                <LivrosLidos userId={user.id} />
                <br/><br/>
                <hr/>
                <br/><br/><br/><br/>
                <hr/>
                <br/><br/>
                <LivrosInteresses userId={user.id} />
            </Layout>
        )
    }
}

MeusLivros.propTypes = {
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(MeusLivros);