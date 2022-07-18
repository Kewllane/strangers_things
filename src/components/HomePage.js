import * as React from 'react';
import {useState, useEffect} from 'react';
import Message from './Message';
import Search from './Search';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';

import { APIURL } from '..';

const HomePage =({ token, posts, setPosts, setPostsToDisplay, postId, setPostId }) => {
    // const [posts, setPosts] = useState([]);
    // const [postId, setPostId] = useState(null)

    useEffect(() => {
        const fetchAllPosts = async () => {
            const response = await fetch (`${APIURL}/posts`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();
            setPosts(result.data.posts);
            setPostsToDisplay(result.data.posts);
        };
        fetchAllPosts();
    }, [token]);
    
    // return (
    //     <div>
    //         <header>
    //             <h1>Home Page</h1>
    //         </header>
    //         <h2>Posts</h2>
    //         {
    //             posts.map(post => <div key={post._id}>
    //                 <h3>{post.title}</h3>
    //                 <div>{post.description}</div>
    //                 <div>{post.location}</div>
    //                 <div>{post.price}</div>
    //                 <div>{post.willDeliver}</div>
    //                 {token ? (
    //                 <Message
    //                     token={token}
    //                     postId={post._id} />
    //                 ) : ("Login to Message User About This Item")}
    //             </div>)
    //         }

            
    //     </div>
    // )
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography sx={{
                    m: 2
                }} component='h2' variant='h3'
                >Home</Typography>
            </Box>
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
            }}>
                <Search
                    token={token}
                    posts={posts}
                    setPost={setPosts}
                    setPostsToDisplay={setPostsToDisplay}
                    />
            </Container>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}>
              {posts.map((post) => (
                 <Grid key={post._id} item xs={12} md={6} sm={4}>
                    <Card
                       variant='outlined'
                       sx={{
                          display: 'flex',
                          backgroundColor: 'aliceblue',
                          boxShadow: '5px 5px grey',
                       }}>
                       <CardContent sx={{ flex: 1 }} key={post._id}>
                          <Typography component='h2' variant='h5'>
                             {post.title}
                          </Typography>
                          <Typography variant='subtitle1'>
                             {post.description}
                          </Typography>
                          <Typography variant='subtitle2'>
                             {post.location},{post.price},{post.willDeliver}
                          </Typography>
                          {token ? (
                            <Message
                                token={token}
                                postId={post._id} />
                            ) : ("Login to Message User About This Item")}
                       </CardContent>
                    </Card>
                 </Grid>
              ))}
           </Grid>
        </>
     );
    
    
}

export default HomePage