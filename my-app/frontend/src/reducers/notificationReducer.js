import { setTimeoutId } from './timeoutReducer'
import store from '../utils/store'

const notificationReducer = (state=null, action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        return action.data
    case 'HIDE_NOTIFICATION':
        return null
    default:
        return state
    }
}


export const setNotification = (notification, timer, color) => {
    const timeoutID = store.getState().timeout
    clearTimeout(timeoutID)
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { content: notification, color: color }
        })
        const timeout = setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
            })
        }, timer*1000)
        dispatch(setTimeoutId(timeout))
    }
}


export default notificationReducer