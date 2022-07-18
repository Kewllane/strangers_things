import * as React from 'react';
import {useState, useEffect} from 'react';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
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
            const result = await response.json();
            if (result) {
                const activePost = result.data.posts.filter(
                    (post) => post.active === true)
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component='h2' variant='h3'
                >Profile</Typography>
            </Box>
            {
                postId
                    ? <Update posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} token={token} />
                    : <Create posts={posts} setPosts={setPosts} token={token} />
            }
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}>
                {posts.map((post) => (
                 <Grid key={post._id} item xs={12} md={6} sm={4} >
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
                       </CardContent>
                       <CardActions>
                            <Button onClick={() => setPostId(post._id)}>Edit</Button>
                            <Button onClick={() => handleDelete(post._id)}>Delete</Button>
                       </CardActions>
                    </Card>
                 </Grid>
              ))}
           </Grid>
        </div>

    )
}

export default UserPage