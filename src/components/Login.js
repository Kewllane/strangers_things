import React, { useState } from 'react';

import { APIURL } from '../index';

async function registerUser(username, password) {
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
            return result;
        })
        .catch(console.error);
   }
   

function Register({ setToken, setUserName, setPassword, username, password }) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(
      username,
      password
    );
    const token = data.data.token
    console.log("data", data)
    console.log("Token in Register", token)
    console.log("setToken in Register", setToken)
    localStorage.setItem("token", JSON.stringify(token))
    setToken(token);
  }

  return(
    <form onSubmit={handleSubmit}>
      <h2> Please Register</h2>
      <label>
        <p>Username</p>
        <input type="text"  onChange={e => setUserName(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default Register