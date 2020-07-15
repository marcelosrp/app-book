import axios from 'axios';

export function FormCadastroRequest(userData) {
    return dispatch => {
        return axios.post('http://localhost:4000/users', userData)
    }
}