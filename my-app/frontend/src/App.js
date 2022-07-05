import React, { useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Users from './components/Users'
import { RequireAuth } from './components/Redirect'
import { getBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'
import { getUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

const App = () => {
    const user = useSelector(state => state.loggedUser)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(setLoggedUser(window.localStorage.getItem('loggedBlogappUser')))
    }, [dispatch])


    return (
        
        <div className="container">
            <NavigationBar />
            <Routes>
                <Route element={<RequireAuth user={user} />}>
                    <Route path="/blogs" element={<BlogList />} />
                </Route>
                <Route path="/login" element={<LoginForm />} />
                <Route element={<RequireAuth user={user} />}>
                    <Route path="/users" element={<Users />} />
                </Route>
            </Routes>
        </div>


    )

}

export default App