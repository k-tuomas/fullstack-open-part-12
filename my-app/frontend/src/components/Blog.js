import React, { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDeleteButton, own }) => {
    const [buttonText, setButtonText] = useState('show')
    const [blogVisible, setBlogVisible] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleVisibility = () => {
        setBlogVisible(!blogVisible)
        buttonText === 'hide' ? setButtonText('show') : setButtonText('hide')
    }

    return(
        <div className='blog' style={blogStyle}>
            <div>
                {blog.title} {blog.author}<button id='show-button' onClick={handleVisibility}>{buttonText}</button>
            </div>
            <div style={{ display: blogVisible ? '' : 'none' }}>
                <div>url: {blog.url}</div>
                <div>likes: {blog.likes} <button id='like-button' onClick={() => handleLikes(blog.id)}>like</button></div>
                <div>added by: {blog.user.name}</div>
                <div style={{ display: own ? '' : 'none' }}>
                    <button id='delete-button' onClick={() => handleDeleteButton(blog)}>remove blog</button>
                </div>

            </div>
        </div>
    )
}


export default Blog