import React, { useState, useEffect } from 'react';
import Message from './Message';

import { APIURL } from '..';

const Inbox = ({token}) => {
    const [allMessages, setAllMessages] = useState([])
    
    useEffect(() => {
        const fetchMessage = async () => {
            const response = await fetch (`${APIURL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();
            setAllMessages(result.data.message);
        };
        fetchMessage()
    }, [token]);

    return (
        <div className="inbox">

        <h1>Inbox</h1>
        {allMessages.map((message) =>
        (<div key={message._id}>
            <h1>{message.fromUser.username}</h1>
            </div>))}
        </div>
    )
}

export default Inbox