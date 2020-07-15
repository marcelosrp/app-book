import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Livro from './livro';
import Toast from '../../Components/Toast';

import './style.scss';

class Resultado extends Component {
    state = {
        acao: undefined,
        data: {},
        auth: undefined,
        message: '',
        severity: '',
        openToast: false
    }

    handleAcao = (acao, data) => {
        if(data.auth === false) {
            this.setState(() => ({
                openToast: true,
                severity: "error",
                message: "Cadastre-se ou faça login para utilizar esse recurso."
            }))
        }else{
            this.setState(() => ({
                acao,
                data
            }), this.handleSendAcao)
        }
    }

    handleSendAcao = () => {

        const url = `http://localhost:4000/livros/${this.state.acao}`;

        axios.post(url, this.state.data)
            .then(res => {
                if(res.status) {
                    this.setState(() => ({
                        openToast: true,
                        severity: "success",
                        message: res.data.success
                    }))
                }
            })
            .catch(err => {
                this.setState(() => ({
                    openToast: true,
                    severity: "error",
                    message: err.response.data.err
                }))
            })
    }

    handleCloseToast = (e, reason) => {
		if (reason === 'clickaway') {
			return
		}

		this.setState(prevState => ({
			search: undefined,
			openToast: false
		}))
	}

    render() {

        const { resultado } = this.props;

        return (
            <section className="resultado-busca">
                {resultado.map((item, index) => {
                    return (
                        <div key={index} className="resultado-busca__item">
                            <Livro
                                id={item.id}
                                thumb={
                                    item.volumeInfo.imageLinks === undefined
                                        ? "thumbless"
                                        : item.volumeInfo.imageLinks.thumbnail
                                }
                                title={item.volumeInfo.title}
                                author={item.volumeInfo.authors}
                                pageCount={item.volumeInfo.pageCount}
                                publishedDate={item.volumeInfo.publishedDate}
                                description={item.volumeInfo.description}
                                handleAcao={this.handleAcao}
                            />
                        </div>
                    )
                })}
                {this.state.openToast && 
                    <Toast 
                        message={this.state.message} 
                        severity={this.state.severity} 
                        open={this.state.openToast} 
                        handleCloseToast={this.handleCloseToast}
                    />
                }
            </section>
        )
    }
}

Resultado.propTypes = {
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Resultado);