import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'

const Search = ({ token, posts, setPostsToDisplay }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredPosts =
            posts.length &&
            posts.filter((post) => postMatches(post, searchTerm));
        const postsToDisplay = searchTerm.length ? filteredPosts : posts;
        setPostsToDisplay(postsToDisplay);
    }, [searchTerm]);

    function postMatches (post, text) {
        if (post.title.includes(searchTerm)) {
            return true;
        }
        if (post.description.includes(searchTerm)) {
            return true;
        }
        if (post.location.includes(searchTerm)) {
            return true;
        }
        if (post.price.includes(searchTerm)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }} component="SearchContainer">
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    }}>
                <TextField
                    margin='normal'
                    fullwidth
                    label='Search'
                    type='text'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    ></TextField>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: ''
                    }}>
                </Box>
        </Container>
    );
};

export default Search