import React, {useState, useEffect} from 'react';
import Create from './Create'
import Update from './Update'
import { APIURL } from '..';

const UserPage =({ token }) => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null)

    useEffect(() => {
        const fetchUserPosts = async () => {
            const response = await fetch (`${APIURL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data) {
                const activePost = data.data.posts.filter(
                    (post) => post.active === true
                );
                setPosts(activePost);
            }
        };
        fetchUserPosts();
    }, [token])
    
    const handleDelete = async (postIdToDelete) => {
        const response = await fetch(`${APIURL}/posts/${postIdToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        if(data) {
            const newPosts = posts.filter(post => post.id !== postIdToDelete);
            setPosts(newPosts);
        }
    }
    
    return (
        <div>
            <header>
                <h1>Profile</h1>
            </header>
            {
                postId
                    ? <Update posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} token={token} />
                    : <Create posts={posts} setPosts={setPosts} token={token} />
            }
            {
                posts.map(post => <div key={post._id}>
                    <h3>{post.title}</h3>
                    <div>{post.description}</div>
                    <div>{post.location}</div>
                    <div>{post.price}</div>
                    <div>{post.willDeliver}</div>
                    <button type="button" className="btn btn-outline-primary" onClick={() => setPostId(post._id)}>Edit</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(post._id)}>Delete</button>
                </div>)
            }
        </div>

    )
}

export default UserPage