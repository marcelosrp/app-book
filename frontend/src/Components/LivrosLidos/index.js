import React, { Component } from 'react';
import axios from 'axios'

class LivrosLidos extends Component {
    state = {
        user: null,
        lidos: [],
        vazio: ""
    }

    getBooks = async () => {
        const url = `http://localhost:4000/livros/lidos/${this.props.userId}`;

        axios
            .get(url)
            .then(res => {
                const data = res.data.lidos;
                const vazio = res.data.message;

                if(data === undefined) {
                    this.setState(() =>({
                        vazio: vazio
                    }));
                    return;
                }

                this.setState(() =>({
                    lidos: data
                }));

            })
            .catch(err => {
                console.log(err);
            })
    }

    async componentDidMount() {
        await this.getBooks();
    }

    render() {

        const { vazio, lidos } = this.state;

        return (
            <>
                <h1>Lidos</h1>

                {vazio ? (
                    <p>{vazio}</p>
                ) : (
                    lidos.map((livros, index) => {
                        const { title, author, thumb } = livros;
    
                        return (
                            <div key={index}>
                                <h3>{title}</h3>
                                <h4>{author}</h4>
                                <img width="200" src={thumb} alt={title} />
                            </div>
                        )
                    })
                )}
            </>
        )
    }
}

export default LivrosLidos;