import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../../Components/Layout';
import Resultado from '../../Components/Resultado'

class BooksList extends Component {
    render() {

        const { search } = this.props.location.state || {};

        return (
            <Layout>
                <h1>Resultado da Busca</h1>

                {search === undefined 
                    ? ( <Redirect to="/" /> ) 
                    : ( <Resultado resultado={search} /> )
                }
            </Layout>
        )
    }
}

export default BooksList;