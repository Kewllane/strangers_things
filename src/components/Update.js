import React, { useState } from 'react';

const cohortName = '2204-FTB-ET-WEB-PT';
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const Update =({posts, setPosts, postId, setPostId}) => {
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${APIURL}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({
                title,
                description,
            })
        });
        const data = await response.json();
        if (data && data.title) {
            const newPosts = posts.map(post => {
                if (posts._id === postId) {
                    return data;
                } else {
                    return post;
                }
            });
            setPosts(newPosts);
            setTitle('');
            setDescription('');
            setPostId(null);
        }
    }

    return <>
        <h3>
            Update a Post
        </h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
            <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
            <button type="submit" className="btn-outline-primary">Submit</button>
        </form>
    </>
}

export default Update