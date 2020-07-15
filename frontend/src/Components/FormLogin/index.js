import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress"

import './style.scss';

class FormLogin extends Component {
    _isMounted = false;

    state = {
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

        this._isMounted && this.setState(() => ({
			loading: true,
			error: undefined
		}))
        
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.login(data).then(() => {
            this.props.history.push('/')
        })
        .catch(err => {
            this._isMounted && this.setState(() =>({
                error: err.response.data.err
            }));
        })
        .finally(() => {
            this._isMounted && this.setState(() => ({
                loading: false
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
            <form onSubmit={this.handleSubmit} className="form-login">
                <div>
                    <TextField
                        name="email"
                        type="email"
                        label="Seu email"
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
                            : ('Entrar')
                        }

                    </Button>
                </div>
                <div className="cadastro-login">
                    <p>Ainda não é cadastrado?</p>
                    <NavLink to="/cadastrar" exact className="cadastro__link">
                        Registre-se aqui!
                    </NavLink>
                </div>
            </form>
        )
    }
}

FormLogin.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(withRouter(FormLogin));