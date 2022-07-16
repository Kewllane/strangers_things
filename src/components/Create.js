import React, { useState } from 'react';

import { APIURL } from '..';

const Create = ({posts, setPosts, token}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Bearer ${token}`)
        const response = await fetch (`${APIURL}/posts`, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
        });
        const result = await response.json();
        setPosts([result.data.post, ...posts]);
        setTitle('');
        setDescription('');
        setLocation('');
        setPrice('');
    };

    return <>
        <h3>
            Create a Post
        </h3>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}>
            </input>
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}>
            </input>
            <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}>
            </input>
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}>
            </input>
            <input
                type="checkbox"
                id="willDeliver"
                value={willDeliver}
                onChange={(event) => setWillDeliver(event.target.value)}>
            </input>
            <label className="willDeliver">Will deliver?</label>
            <button type="submit" className=" btn btn-outline-primary">Submit</button>
        </form>
    </>
}

export default Create