import React, { useState } from 'react';

import { APIURL } from '..';

const Update =({posts, setPosts, postId, setPostId}) => {
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${APIURL}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver,
                }
            })
        });
        const result = await response.json();
        if (result && result.title) {
            const newPosts = posts.map(post => {
                if (posts._id === postId) {
                    return result;
                } else {
                    return post;
                }
            });
            setPosts(newPosts);
            setTitle('');
            setDescription('');
            setPostId(null);
            setPrice('');
            setLocation('');
            setWillDeliver(false)
        }
    }

    return <>
        <h3>
            Update a Post
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
                type="text"
                placeholder="Will Deliver?"
                value={willDeliver}
                onChange={(event) => setWillDeliver(event.target.value)}>
            </input>
            <button type="submit" className="btn-outline-primary">Submit</button>
        </form>
    </>
}

export default Update