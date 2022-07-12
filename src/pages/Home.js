import React, { useEffect, useState } from 'react';
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
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

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
    const [params, setParams] = useQueryParams({
        search: StringParam,
        page: NumberParam,
    });
    const { search, page } = params;
    const [searchState, setSearchState] = useState(search);
    const [debounceSearch] = useDebounce(searchState, 500);

    const posts = usePostsQuery({ page, search: debounceSearch, per_page: 12 });

    useEffect(() => {
        setParams({ page: undefined, search: debounceSearch });
    }, [debounceSearch]);

    return (
        <MainTemplate>
            <SearchInput
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
            />
            {posts.isLoading ? (
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <div>
                    <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: '3rem' }}
                    >
                        {posts.data?.data?.data.map((post) => (
                            <Grid key={post.id} item xs={12} sm={6} md={4}>
                                <PostCard
                                    slug={post.slug}
                                    title={post.title}
                                    content={post.content}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={posts?.data?.data?.last_page}
                        onChange={(event, value) => setParams({ page: value })}
                        page={page}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    />
                </div>
            )}
        </MainTemplate>
    );
};

export default Home;
