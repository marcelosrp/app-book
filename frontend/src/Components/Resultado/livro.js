import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

class FormLido extends Component {
    render() {

        const { isAuthenticated, user } = this.props.auth;

        return (
            <>
                {this.props.thumb === "thumbless" 
                    ? ( <BrokenImageIcon style={{ fontSize: 60, margin: '0 auto' }} /> ) 
                    : ( <img src={this.props.thumb} alt={this.props.title} /> )
                }
                <h2>{this.props.title}</h2>
                {this.props.author && 
                    <p>
                        <strong>Autor: </strong>
                        {this.props.author}
                    </p>
                }
                {this.props.pageCount &&
                    <p>
                        <strong>Número de páginas: </strong>
                        {this.props.pageCount}
                    </p>
                }
                {this.props.publishedDate && 
                    <p>
                        <strong>Data de publicação: </strong>
                        {moment(this.props.publishedDate).format('DD/MM/YYYY')}
                    </p>
                }
                {this.props.description &&
                    <p>
                        {this.props.description}
                    </p>
                }

                <button 
                    type="button" 
                    onClick={
                        isAuthenticated
                        ? () => this.props.handleAcao('lidos', {title: this.props.title, author: this.props.author.toString(), thumb: this.props.thumb, userId: user.id})
                        : () => this.props.handleAcao('lidos', {auth: false })
                    }>
                        Marcar como lido
                </button>
                <button 
                    type="button" 
                    onClick={
                        isAuthenticated
                        ? () => this.props.handleAcao('interesses', {title: this.props.title, author: this.props.author.toString(), thumb: this.props.thumb, userId: user.id})
                        : () => this.props.handleAcao('interesses', {auth: false })
                    }>
                        Marcar como interesse
                </button>
            </>
        )
    }
}

FormLido.propTypes = {
    handleAcao: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(FormLido);