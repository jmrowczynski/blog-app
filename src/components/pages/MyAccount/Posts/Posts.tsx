import { useMyPostsQuery } from '../../../../services/api/hooks/useMyPostsQuery';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import PostCard, { PostCardProps } from '../../../PostCard';
import React from 'react';

const Posts = () => {
    const posts = useMyPostsQuery();
    const postsData = posts.data?.data?.data;

    const renderPosts =
        postsData?.length > 0 ? (
            <Grid container spacing={2} style={{ marginBottom: '3rem' }}>
                {postsData.map((post: PostCardProps) => (
                    <Grid key={post.id} item xs={12} sm={6} md={4}>
                        <PostCard
                            slug={post.slug}
                            title={post.title}
                            content={post.content}
                        />
                    </Grid>
                ))}
            </Grid>
        ) : (
            <Typography>No results</Typography>
        );

    return (
        <div>
            {posts.isLoading ? (
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                renderPosts
            )}
        </div>
    );
};

export default Posts;
