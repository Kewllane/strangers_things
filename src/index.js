import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Create from './components/Create';
import Update from './components/Update';
import Register from './components/Register';

export const cohortName = '2204-FTB-ET-WEB-PT';
export const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const App = () => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null)
    const [token, setToken] = useState();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleDelete = async (postIdToDelete) => {
        const response = await fetch(`${APIURL}/posts/${postIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if(data) {
            const newPosts = posts.filter(post => post.id !== postIdToDelete);
            setPosts(newPosts);
        }
    }

    useEffect(() => {
        const fetchAllPosts = async () => {
            const response = await fetch (`${APIURL}/posts`);
            const data = await response.json();
            setPosts(data.data.posts);
        }
        fetchAllPosts();
    }, [])

    // const getToken = () => {
    //     const tokenString = localStorage.getItem('token');
    //     const userToken = JSON.parse(tokenString);
    //     console.log("userToken", userToken)
    //     return userToken?.token
    //   };
    //   const [token, setToken] = useState();

    //   console.log("token in App.js", token)

      
    //  if(!token){
          
    //     console.log("Im hiting else if ");
    //     return <Register setToken={setToken} />
    //   }

    return( 
        <Router>
            <div className="app">
                <header className ="header">
                    <h1>Strangers Things</h1>
                </header>
            <Routes>
                <Route path="/HomePage" element={<HomePage />}></Route>
                {/* <Route path="/UserPage" element={<UserPage />}></Route>
                <Route path="/Login" element={<Login />}>{''}<Login /></Route> */}
                <Route path="/Register" element={<Register setToken={setToken} setUserName={setUserName} username={username} password={password} setPassword={setPassword} />}></Route>
            </Routes>
            <div id="navbar">
                <Link to="/HomePage">Home</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
            </div>
            {
                postId
                    ? <Update posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} />
                    : <Create posts={posts} setPosts={setPosts} />
            }
            {
                posts.map(post => <div key={post._id}>
                    <h3>{post.title}</h3>
                    <div>{post.description}</div>
                    <button type="button" className="btn btn-outline-primary" onClick={() => setPostId(post._id)}>Edit</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(post._id)}>Delete</button>
                </div>)
            }
        </div>
    </Router>
)}

// const app = document.getElementById('app')
ReactDOM.render(<App />, document.getElementById("app"));