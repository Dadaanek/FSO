import axios from "axios";
const base_url = 'http://localhost:3001/persons'

const personAdd = (object) => {
    return axios.post(base_url, object).then(response => {
        console.log(response.data)
        return response.data
    })
}

const personDelete = (id) => {
    return axios.delete(`${base_url}/${id}`).then(response => response)
}

const personUpdate = (id, object) => {
    return axios.put(`${base_url}/${id}`, object).then(response => response.data)
}

export default {personAdd, personDelete, personUpdate}