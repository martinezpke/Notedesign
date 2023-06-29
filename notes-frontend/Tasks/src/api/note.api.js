import axios from "axios";


export const getAllNote = () => {
    return axios.get("http://127.0.0.1:8000/api/tasks/")
}

export const deleteNote = ( id ) => {
    return axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`)
}

export const CreateNote = ( noteData ) => {
    return axios.post(`http://127.0.0.1:8000/api/tasks/`, noteData)
}

export const updateNote = ( id, noteData ) => {
    return axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, noteData)
}