import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from '../reducers/notificationReducer'
import timeoutReducer from '../reducers/timeoutReducer'
import blogReducer from '../reducers/blogReducer'
import loggedUserReducer from '../reducers/loggedUserReducer'
import usersReducer from '../reducers/usersReducer'


const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    timeout: timeoutReducer,
    loggedUser: loggedUserReducer,
    users: usersReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)


export default store