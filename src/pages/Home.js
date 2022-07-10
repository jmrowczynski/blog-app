import React, { useState } from 'react';
import { Box, CircularProgress, Grid, Pagination } from '@mui/material';
import MainTemplate from '../templates/MainTemplate';
import { usePostsQuery } from '../services/api/hooks/usePostsQuery';
import PostCard from '../components/PostCard';

const Home = () => {
    const [page, setPage] = useState(1);
    const posts = usePostsQuery({ page });

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
            <Grid container spacing={2} style={{ marginBottom: '3rem' }}>
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
            <Pagination
                count={posts?.data?.data?.last_page}
                onChange={(event, value) => setPage(value)}
                page={page}
            />
        </MainTemplate>
    );
};

export default Home;
