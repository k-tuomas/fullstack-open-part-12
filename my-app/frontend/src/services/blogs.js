import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const config = {
        headers: { Authorization: token }
    }

    const request = axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.then(response => response.data)
}

const deleteBlog = (id) => {
    const config = {
        headers: { Authorization: token }
    }

    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(() => id)
}

const exprt = { getAll, getById, create, setToken, deleteBlog, update }

export default exprt