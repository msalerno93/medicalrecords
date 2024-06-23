import axios from 'axios'

const url = process.env.REACT_APP_API_URL;

const login = async (userData) => {
    const response = await axios.post(`${url}user/signin`)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}


const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    logout,
    login,
}


export default authService