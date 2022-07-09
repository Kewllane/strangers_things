const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log("userToken", userToken)
    return userToken?.token
  };

//   console.log("token in App.js", token)

// //  if(!token){ 
//     console.log("Im hiting else if ");
//   }