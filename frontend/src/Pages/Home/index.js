import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import axios from 'axios';
import Layout from '../../Components/Layout';
import Search from '../../Components/Search';
import Toast from '../../Components/Toast';
import Loading from '../../Components/Loading';

class Home extends Component {
    state = {
		book: '',
		search: undefined,
		openToast: false,
		errorInput: false,
		isLoading: false,
		message: '',
		severity: ''
	}

	handleChange = e => {
        const target = e.target.value;
        
		this.setState(prevState => ({ 
			book: target, 
			errorInput: false 
		}))
	}

	handleSubmit = (e) => {
		e && e.preventDefault()

		this.setState(prevState => ({ isLoading: true }))

		if(this.state.book === "") {
			this.setState(prevState => ({ 
				errorInput: true, 
				isLoading: false 
			}))
		}else{
			const key = 'AIzaSyBuXlHQuZMeDw_-EIv0TcPlHWJDnmqlQXM'
			const max_results = 40
			const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.book}&key=${key}&maxResults=${max_results}`

			fetch(url).then(async response => {
				const data = await response.json();

				if(data.items === undefined) {
					this.setState(prevState => ({ 
						search: undefined,
						openToast: true,
						severity: "error",
						message: 'Sua pesquisa não retornou nenhum resultado.'
					}))
				}else{
					this.setState(prevState => ({ search: data.items }));
				}
				
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				this.setState(prevState => ({ isLoading: false }));
			})
		}
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
        return (
            <Layout>
                <h1>Home</h1>

                <Search 
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit} 
					error={this.state.errorInput}
				/>

                {this.state.isLoading 
					? ( <Loading /> )
					: (
						this.state.search === undefined 
							? ( 
								<Toast 
									message={this.state.message} 
									severity={this.state.severity} 
									open={this.state.openToast} 
									handleCloseToast={this.handleCloseToast}
								/>
							  )
							: ( 
								<Redirect 
									to={
										{ 
											pathname: `/busca/${this.state.book}`, 
											state: { search: this.state.search }
										}
									}
								/>
							  )
					)
				}
            </Layout>
        )
    }
}

export default Home;