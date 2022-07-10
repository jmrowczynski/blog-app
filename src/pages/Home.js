import React, { useState } from 'react';
import {
    Box,
    CircularProgress,
    Grid,
    Pagination,
    TextField,
} from '@mui/material';
import MainTemplate from '../templates/MainTemplate';
import { usePostsQuery } from '../services/api/hooks/usePostsQuery';
import PostCard from '../components/PostCard';
import { useDebounce } from 'use-debounce';

const SearchInput = ({ value, onChange }) => {
    return (
        <TextField
            style={{ marginBottom: '2rem' }}
            fullWidth
            value={value}
            onChange={onChange}
            label="Search"
        />
    );
};

const Home = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [debounceSearch] = useDebounce(search, 500);
    const posts = usePostsQuery({ page, search: debounceSearch, per_page: 12 });

    if (posts.isLoading)
        return (
            <MainTemplate>
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            </MainTemplate>
        );

    return (
        <MainTemplate>
            <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Grid container spacing={2} style={{ marginBottom: '3rem' }}>
                {posts.data?.data?.data.map((post) => (
                    <Grid key={post.id} item xs={12} sm={6} md={4}>
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
                style={{ display: 'flex', justifyContent: 'center' }}
            />
        </MainTemplate>
    );
};

export default Home;
