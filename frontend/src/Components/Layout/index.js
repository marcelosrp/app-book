import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Header from '../Header'


class Layout extends Component {
    render() {

        const { children } = this.props;

        return (
            <Container>
                <Header />
                { children }
            </Container>
        )
    }
}

export default Layout;