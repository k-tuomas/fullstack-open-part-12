import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const logout = () => {
    console.log('logging out', window.localStorage.getItem('loggedNoteappUser'))
    window.localStorage.clear()
    window.location.reload(false)
}

const exprt = { login, logout }
export default exprt