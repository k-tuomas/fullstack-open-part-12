import blogService from '../services/blogs'

const loggedUserReducer = (state=null, action) => {
    switch (action.type) {
    case 'SET_LOGGED_USER':
        return action.data
    case 'GET_LOGGED_USER':
        return state
    default: 
        return state  
    }
}


export const setLoggedUser = (user) => {
    return async dispatch => {
        if (user){
            user = JSON.parse(user)
            blogService.setToken(user.token)
        }
        await dispatch({
            type: 'SET_LOGGED_USER',
            data: user
        })

    }
}


export default loggedUserReducer