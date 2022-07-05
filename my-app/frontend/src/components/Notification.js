import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
   
    let messageStyle
    notification
        ?
        messageStyle = {
            color: notification.color,
            fontStyle: 'bold',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            background: 'LightGrey'
        }
        :
        messageStyle = {
            display: 'none'
        }
    
    if (notification) {
        return (
            <div className='error' style={messageStyle}>
                {notification.content}
            </div>
        )
    } else {
        return (
            <div className='error' style={messageStyle}>
                {notification}
            </div>
        )
    }

}

export default Notification