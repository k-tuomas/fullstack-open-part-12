import { React } from 'react'
import store from '../utils/store'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
    const user = store.getState().loggedUser
    const padding = {
        padding: 5
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/blogs">Blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/users">Users</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        {user
                            ? <em>{user.username} logged in</em>
                            : <Link to="/login">login</Link>
                        }
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar