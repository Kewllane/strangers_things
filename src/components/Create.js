import React, { useState } from 'react';
import { APIURL } from '..';

const Create = ({posts, setPosts}) => {
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState ([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch (`${APIURL}/posts`, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({
                title,
                description,
            })
        });
        const data = await response.json();
        setPosts([data, ...posts]);
        setTitle('');
        setDescription('');
    }

    return <>
        <h3>
            Create a Post
        </h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
            <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
            <button type="submit" className="btn-outline-primary">Submit</button>
        </form>
    </>
}

export default Create