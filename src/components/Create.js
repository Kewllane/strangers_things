import { Checkbox, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button'
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'

import { APIURL } from '..';

const Create = ({posts, setPosts, token}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Bearer ${token}`)
        const response = await fetch (`${APIURL}/posts`, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
        });
        const result = await response.json();
        setPosts([result.data.post, ...posts]);
        setTitle('');
        setDescription('');
        setLocation('');
        setPrice('');
    };

    return <>
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
            <Typography component='h1' variant='h4'>
                Create a Post
            </Typography> 
            <Box component='form' onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}>
                </TextField>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Will Deliver?" onChange={(event) => setLocation(event.target.value)} />
                </FormGroup>
                <Button sx={{
                    m: 2
                }} type="submit" variant='outlined' >Create</Button>
            </Box>
        </Box>
        </Container>
    </>
}

export default Create