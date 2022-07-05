
import store from '../utils/store'
import blogService from '../services/blogs'
import compare from '../utils/compare'
import { setNotification } from './notificationReducer'



const blogReducer = (state=[], action) => {
    switch (action.type) {
    case 'REMOVE_BLOG':
        return state.filter(el => {return el.id !== action.data})
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'GET_BLOGS':
        return action.data
    case 'LIKE_BLOG': {
        const likedBlog = action.data.updatedBlog
        return state.map(blog => (blog.id === likedBlog.id) ? likedBlog : blog)
    }
    default:
        return state
    }
}


export const getBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        blogs.sort(compare)
        dispatch({
            type: 'GET_BLOGS',
            data: blogs
        })
    }
}


export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 3, 'green'))
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }   
}


export const likeBlog = (id) => {
    const user = store.getState().loggedUser
    return async dispatch => {
        const objectToUpdate = await blogService.getById(id)
        const newObject = { ...objectToUpdate, likes: objectToUpdate.likes + 1  }
        const updatedBlog = await blogService.update(id, newObject)
        updatedBlog.user = user
        dispatch({
            type: 'LIKE_BLOG',
            data: { updatedBlog }
        })
    }
}


export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id 
        })
    }
}

export default blogReducer


