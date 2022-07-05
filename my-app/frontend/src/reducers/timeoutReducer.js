const timeoutReducer = (state=null, action) => {
    switch (action.type) {
    case 'SET_TIMEOUT':
        return action.data
    default:
        return state
    }
}

export const setTimeoutId = (timeoutId) => {
    return async dispatch => {
        dispatch({
            type: 'SET_TIMEOUT',
            data: timeoutId
        })
    }
}
  
export default timeoutReducer