import React from 'react';
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import './style.scss'

const Search = ({ handleChange, handleSubmit, error }) => {
    return (
        <form className="form-search" onSubmit={handleSubmit}>
            <TextField 
                className="input-search" 
                label={error ? "Campo obrigatório" : "Digite o livro que deseja encontrar"} 
                variant="outlined"
                onChange={handleChange}
                error={error}
            />
            
            <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                className="button-search"
            >
                <SearchIcon />
            </Button>
        </form>
    )
}

Search.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

export default Search