import React from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import MainTemplate from '../templates/MainTemplate';
import { usePostsQuery } from '../services/api/hooks/usePostsQuery';
import PostCard from '../components/PostCard';

const Home = () => {
    const posts = usePostsQuery();

    if (posts.isLoading)
        return (
            <MainTemplate>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            </MainTemplate>
        );

    return (
        <MainTemplate>
            <Grid container spacing={2}>
                {posts.data?.data?.data.map((post) => (
                    <Grid key={post.id} item xs={4}>
                        <PostCard
                            id={post.id}
                            title={post.title}
                            content={post.content}
                        />
                    </Grid>
                ))}
            </Grid>
        </MainTemplate>
    );
};

export default Home;
