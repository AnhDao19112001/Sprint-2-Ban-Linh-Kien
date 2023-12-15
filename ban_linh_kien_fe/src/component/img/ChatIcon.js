import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import './ChatIcon.css';

const ChatIcon = () => {
    const [showChat, setShowChat] = useState(false);
    const [message, setMessage] = useState('');
    const user = {
        name: 'Your Name',
        avatar: 'link_to_your_avatar_image'
    };
    const handleMouseEnter = () => {
        setShowChat(true);
    };

    const handleMouseLeave = () => {
        setShowChat(false);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        // Handle sending message logic here
        console.log(`Sending message: ${message}`);
        // Clear input after sending message
        setMessage('');
    };

    return (
        // <div className="chat-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        //     <FontAwesomeIcon icon={faComment} className="chat-icon-content" />
        //     {showChat && (
        //         <div className="chat-popup">
        //             Bạn cần trợ giúp?
        //         </div>
        //     )}
        // </div>

        <div className="chat-container">
            <div className="chat-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faComment} className="chat-icon-content" />
            </div>
            {showChat && (
                <div className="chat-popup">
                    <div className="chat-header">
                        <img src={user.avatar} alt="User Avatar" className="user-avatar" />
                        <span className="user-name">{user.name}</span>
                    </div>
                    <div className="chat-messages">
                        {/* Display chat messages here */}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={handleMessageChange}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ChatIcon;
