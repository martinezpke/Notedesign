import axios from "axios";


export const getAllNote = () => {
    return axios.get("http://127.0.0.1:8000/api/tasks/")
}

export const deleteNote = ( id ) => {
    return axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`)
}

export const selectNote = ( id ) => {
     return axios.get(`http://127.0.0.1:8000/api/tasks/${id}`)
}