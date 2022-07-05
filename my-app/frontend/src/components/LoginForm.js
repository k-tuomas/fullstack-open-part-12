import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const navigate = useNavigate()


    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            dispatch(setLoggedUser(window.localStorage.getItem('loggedBlogappUser')))
            navigate('/blogs')


        } catch (exception) {
            dispatch(setNotification('invalid username or password', 3, 'red'))
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification warning={true} />
            <form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        id='username'
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
        
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        id='password'
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                 
                    <Button id='login-button' variant="primary" type="submit">login</Button>
                
                </Form.Group>
            </form>
        </div>
    )
}

export default LoginForm

