import React, { useState} from 'react';

import { APIURL } from '..';

const Message = ({ token, postId}) => {
    const [content, setContent] = useState('');
    const [message, setMessage] = useState([]);

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
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}>
                </input>
                <button type="button" className="btnMessage">Message</button>
            </form>
        </div>
    )
}

export default Message