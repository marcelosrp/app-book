import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress"

import './style.scss';

class FormCadastro extends Component {
    _isMounted = false;

    state = {
        name: '',
        email: '',
        password: '',
        success: undefined,
        error: undefined,
        loading: false
    }

    handleChange = e => {
        const obj = {};
        obj[e.target.name] = e.target.value;
        this._isMounted && this.setState(() => (obj));
    }

    handleSubmit = e => {
        e.preventDefault();

        this._isMounted && this.setState(() =>({
            error: undefined
        }));
        
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        this.props.FormCadastroRequest(data)
            .then(res => {
                if(res.status) {
                    this._isMounted && this.setState(() =>({
                        success: res.data.success,
                    }));
                }
            })
            .catch(err => {
                if(err.response) {

                    this._isMounted && this.setState(() =>({
                        error: err.response.data.err,
                        success: undefined
                    }));
                }
            })
            .finally(() => {
                this._isMounted && this.setState(() => ({
                    loading: false,
                    name: '',
                    email: '',
                    password: ''
                }))
            })
    }

    componentDidMount() {
		this._isMounted = true
	}

	componentWillUnmount() {
		this._isMounted = false
	}

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-cadastro">
                <div>
                    <TextField
                        name="name"
                        type="text"
                        label="Seu nome"
                        variant="outlined"
                        className="input-default"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        name="email"
                        type="email"
                        label="Seu e-mail"
                        variant="outlined"
                        className="input-default"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        name="password"
                        type="password"
                        label="Sua senha"
                        variant="outlined"
                        className="input-default"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                {this.state.error && <div className="error">{this.state.error}</div>}
                <div>
                    <Button
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        className="button-default"
                    >
                        {
                            this.state.loading
                            ? (
                                <>
                                    Enviando
                                    <CircularProgress className="circle-loading" size={20} />
                                </>
                            )
                            : ('Cadastrar')
                        }
                    </Button>
                    {this.state.success && <div>{this.state.success}</div>}
                </div>
            </form>
        )
    }
}

FormCadastro.propTypes = {
    FormCadastroRequest: PropTypes.func.isRequired
}

export default FormCadastro;