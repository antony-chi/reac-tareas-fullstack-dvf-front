import axios from "axios";

const API_URL = "https://giant-gray-smock.cyclic.app/api/tareas/"

const createTarea = async (tareaData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios .post(API_URL,tareaData, config)

    return response.data
}

//obtner tareas de la api
const getTareas = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

//borrar tarea API
const deleteTarea = async (tareaid, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+ tareaid,config)

    return response.data
}

const tareaService = {
    createTarea,
    getTareas,
    deleteTarea
}

export default tareaService