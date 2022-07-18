import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Create from './components/Create';
import Update from './components/Update';
import Register from './components/Register';
import Login from './components/Login';
import UserPage from './components/UserPage'
import Inbox from './components/Inbox'
import Logout from './components/Logout'
import Typography from '@mui/material/Typography';

export const cohortName = '2204-FTB-ET-WEB-PT';
export const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const App = () => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null);
    const [token, setToken] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [postsToDisplay, setPostsToDisplay] = useState([])

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try{
            const storedToken = JSON.parse(sessionStorage.getItem('token'))
            if (storedToken) {
                setToken(storedToken)
            }
        } catch (e) {
            if (e !== "No current user") {
                alert(e);
            }
        }
    }

    return ( 
        <Router>
            <div className="app">
                <div id="navbar">
                    <Typography sx= {{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}>
                        <Link to="/HomePage">Home</Link>
                        {!token ? (<>
                        <Link to="/Login">Login</Link>
                        <Link to="/Register">Register</Link>
                        </>
                        ) : ('')}

                        {token ? (<>
                        <Link to="/UserPage">Profile</Link>
                        <Link to="/Inbox">Inbox</Link> 
                        <Link to="/Logout">Logout</Link>
                        </>
                        ) : ('')}
                    </Typography>
                </div>
                <Typography  variant='h2' component='div' sx= {{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    Strangers Things
                </Typography>
                <Routes>
                    <Route path="/" element={<HomePage
                        posts={postsToDisplay}
                        setPosts={setPosts}
                        setPostsToDisplay={setPostsToDisplay}/>}></Route>
                    <Route path="/HomePage" element={<HomePage
                        token={token}
                        posts={postsToDisplay}
                        setPosts={setPosts}
                        setPostsToDisplay={setPostsToDisplay}/>}>
                    </Route>
                    <Route path="/Login" element={<Login
                        setToken={setToken}
                        setUsername={setUsername}
                        username={username}
                        password={password}
                        setPassword={setPassword} />}>
                    </Route>
                    <Route path="/Register" element={<Register
                        token={token}
                        setToken={setToken}
                        setUsername={setUsername}
                        username={username}
                        password={password}
                        setPassword={setPassword} />}>
                    </Route>
                    <Route path="/UserPage" element={<UserPage
                        token={token}/>}>
                    </Route>
                    <Route path="/Inbox" element={<Inbox
                        token={token}/>}>
                    </Route>
                    <Route path="/Logout" element={<Logout
                        token={token}
                        setToken={setToken}/>}>
                    </Route>
                </Routes>
            </div>
        </Router>
);}

// const app = document.getElementById('app')
ReactDOM.render(<App />, document.getElementById("app"));

export default App;