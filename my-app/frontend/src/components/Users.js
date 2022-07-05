import React from 'react'
import store from '../utils/store'
import { Table } from 'react-bootstrap'


const Users = () => {
    const users = store.getState().users

    return(
        <div>
            <h1>Users</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blog count</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <tr key={user.id}>
                            <td>
                                {user.name} 
                            </td>
                            <td>
                                <b>{user.blogs.length}</b>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Users