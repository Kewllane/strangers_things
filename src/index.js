import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Create from './components/Create';
import Update from './components/Update';
import Register from './components/Register';
import Login from './components/Login';
import UserPage from './components/UserPage'

export const cohortName = '2204-FTB-ET-WEB-PT';
export const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const App = () => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null);
    const [token, setToken] = useState();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

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

    async function handleLogout() {
        setToken('');
        sessionStorage.removeItem('token')
    }

    return ( 
        <Router>
            <div className="app">
                <div id="navbar">
                    <Link to="/HomePage">Home</Link>
                    <Link to="/Login">Login</Link>
                    <Link to="/Register">Register</Link>
                </div>
                <header className ="header">
                    <h1>Strangers Things</h1>
                </header>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>>
                    <Route path="/HomePage" element={<HomePage token={token}/>}></Route>
                    {/* <Route path="/UserPage" element={<UserPage />}></Route> */}
                    <Route path="/Login" element={<Login
                        setToken={setToken}
                        setUserName={setUserName}
                        username={username}
                        password={password}
                        setPassword={setPassword} />}>
                    </Route>
                    <Route path="/Register" element={<Register
                        setToken={setToken}
                        setUserName={setUserName}
                        username={username}
                        password={password}
                        setPassword={setPassword} />}>
                    </Route>
                </Routes>
            </div>
        </Router>
);}

// const app = document.getElementById('app')
ReactDOM.render(<App />, document.getElementById("app"));

export default App;