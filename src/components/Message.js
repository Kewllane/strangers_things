import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { APIURL } from '..';

const Message = ({ token, postId}) => {
    const [content, setContent] = useState('');
    const [message, setMessage] = useState([]);
    const history = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch (`${APIURL}/posts/${postId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content,
                }
            })
        })
        const result = await response.json();
        setMessage ([result.data.message, ...message]);
        setContent('');
        history('/Inbox');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Message"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}>
                </input>
                <button type="submit" className="btnMessage">Message{' '}</button>
            </form>
        </div>
    );
};

export default Message