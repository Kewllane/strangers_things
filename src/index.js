import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const cohortName = '2204-FTB-ET-WEB-PT';
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const App = () => {
    const [posts, setPosts] = useState([]);
    console.log(posts)

    useEffect(() => {
        const fetchAllPosts = async () => {
            const response = await fetch (`${APIURL}/posts`);
            const data = await response.json();
            setPosts(data.data.posts);
        }
        fetchAllPosts();
    }, [])

    return <div className="app">
        <header className ="header">
            <h1>Strangers Things</h1>
        </header>
        {
            posts.map(post => <div key={post._id}>
                <h3>{post.title}</h3>
                <div>{post.description}</div>
            </div>)
        }
    </div>
}

// const app = document.getElementById('app')
ReactDOM.render(<App />, document.getElementById("app"));