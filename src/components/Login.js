import React from 'react';
import { useNavigate } from 'react-router-dom';

import { APIURL } from '../index';

async function loginUser(username, password) {
    return fetch(`${APIURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user: {
              username: username,
              password: password,
          }
      })
    }).then(response => response.json())
        .then(result => {
            console.log(result);
            return result.data.token;
        })
        .catch(console.error);
   }
   

function Login({ setToken, setUsername, setPassword, username, password }) {
  const history = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const token = await loginUser(
        username,
        password
      );
      if (token) {
      sessionStorage.setItem("token", JSON.stringify(token))
      setToken(token);
      history('/UserPage')
      alert("Logged In!")
    } else {
      alert("Incorrect Information")
    }} catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2> Please Log In</h2>
        <label>
          <p>Username</p>
          <input type="text"  onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login