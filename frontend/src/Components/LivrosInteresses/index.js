import React, { Component } from 'react';
import axios from 'axios'

class LivrosInteresses extends Component {
    state = {
        interesses: [],
        vazio: ""
    }

    getBooks = async () => {
        const url = `http://localhost:4000/livros/interesses/${this.props.userId}`;

        axios
            .get(url)
            .then(res => {
                const data = res.data.interesses;
                const vazio = res.data.message;

                if(data === undefined) {
                    this.setState(() =>({
                        vazio: vazio
                    }));
                    return;
                }

                this.setState(() =>({
                    interesses: data
                }));
            })
            .catch(err => {
                console.log(err)
            })
    }

    async componentDidMount() {
        await this.getBooks();
    }

    render() {

        const { vazio, interesses } = this.state;

        return (
            <>
                <h1>Quero ler</h1>

                {vazio ? (
                    <p>{vazio}</p>
                ) : (
                    interesses.map((livros, index) => {
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

export default LivrosInteresses;