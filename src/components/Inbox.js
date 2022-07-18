import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { APIURL } from '..';

const Inbox = ({token}) => {
    const [allMessage, setAllMessage] = useState([])
    
    useEffect(() => {
        const fetchMessage = async () => {
            const response = await fetch (`${APIURL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();
            setAllMessage(result.data.messages);
        };
        fetchMessage()
    }, [token]);

    // return (
    //     <div className="inbox">
    //         <h1>Inbox</h1>
    //             {allMessage.map((message) =>
    //             (<div key={message._id}>
    //                 <h2>{message.fromUser.username}</h2>
    //                 <h3>{message.content}</h3>
    //                 </div>
    //             ))}
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
                }} component='h2' variant='h2'
                >Inbox</Typography>
            </Box>
            <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {allMessage.map((message) => (
                    <Grid key={message.post._id} item xs={12} md={6} sm={4}>
                        <Card
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                backgroundColor: 'aliceblue',
                                boxShadow: '5px 5px grey',
                            }}
                        >
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5" id="sender">
                                    Sender: {message.fromUser.username}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Post Title:{message.post.title}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Message:{message.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
	);
}

export default Inbox;