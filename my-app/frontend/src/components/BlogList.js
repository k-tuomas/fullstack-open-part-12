import React, { useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import { likeBlog, removeBlog, createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import loginService from '../services/login'


const BlogList = () => {
    const user = useSelector(state => state.loggedUser)
 
    const dispatch = useDispatch() 
    const blogs = useSelector(state => state.blogs) 
    const blogFormRef = useRef()

    const addBlog = (blogObject) => {
       
        blogFormRef.current.toggleVisibility()
        dispatch(createBlog(blogObject))
    }

    const blogForm = () => (
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
        </Togglable>
    )

    const handleLikes = (blogid) => {
        dispatch(likeBlog(blogid))
    }

    const handleDeleteButton = (blog) => {
        if (window.confirm(`remove blog ${blog.title}?`)) {
            dispatch(removeBlog(blog.id))
        }
    }

    return(
        <div>
            <h2>Blogs</h2>
            <div>
                <button onClick={loginService.logout}>logout</button>
            </div>
            <Notification warning={false} />
            {blogForm()}
            {blogs.map(blog =>
                <Blog
                    key={JSON.stringify(blog)}
                    blog={blog}
                    user={user}
                    handleLikes={handleLikes}
                    handleDeleteButton={handleDeleteButton}
                    own={blog.user.username === user.username}
                />
            )}
        </div>
    )
    
}

export default BlogList