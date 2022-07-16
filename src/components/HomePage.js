import React, {useState, useEffect} from 'react';
import Message from './Message';

import { APIURL } from '..';

const HomePage =({ token }) => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null)

    useEffect(() => {
        const fetchAllPosts = async () => {
            const response = await fetch (`${APIURL}/posts`);
            const data = await response.json();
            setPosts(data.data.posts);
        }
        fetchAllPosts();
    }, [])
    
    return (
        <div>
            <header>
                <h1>Home Page</h1>
            </header>
            <h2>Posts</h2>
            {
                posts.map(post => <div key={post._id}>
                    <h3>{post.title}</h3>
                    <div>{post.description}</div>
                    <div>{post.location}</div>
                    <div>{post.price}</div>
                    <div>{post.willDeliver}</div>
                    {token ? (
                    <Message />
                    ) : ("Login to Message User About This Item")}
                </div>)
            }
        </div>
    )
}

export default HomePage