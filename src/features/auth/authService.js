import axios from "axios";

const API_URL = "https://giant-gray-smock.cyclic.app/api/users/"
//registrar usuario
const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        return response.data
    }
}

//login usuario
const login = async(userData) => {
    const response = await axios.post(API_URL + "login", userData)

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data))
        return response.data
    }
}

//logout user
const logout = () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    logout,
    login
}

export default authService