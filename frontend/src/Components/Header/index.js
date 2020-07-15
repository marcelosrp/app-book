import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

import './style.scss';

class Header extends Component {

    logout = e => {
        this.props.logout();
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;

        const publicLinks = (
            <>
                <NavLink to="/login" exact className="header__link">Login</NavLink>
                <NavLink to="/cadastrar" exact className="header__link">Cadastro</NavLink>
            </>
        );

        const privateLinks = (
            <>
                <NavLink to="/meus-livros" exact className="header__link">Meus livros</NavLink>
                <button onClick={this.logout}>sair</button>
            </>
        );

        return (
            <header className="header">
                <div className="header__logo">
                    <p>Books Control</p>
                </div>
                {
                    isAuthenticated && 
                    <div className="header__username">
                        <p>Olá, {user.name}</p>
                    </div>
                }
                <div className="header__menu">
                    <NavLink to="/" exact className="header__link">Home</NavLink>
                    { isAuthenticated ? privateLinks : publicLinks }
                </div>
            </header>
        )
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Header);