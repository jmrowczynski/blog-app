import { useMyPostsQuery } from '../../../../services/api/hooks/useMyPostsQuery';
import {
    Box,
    CircularProgress,
    Grid,
    Pagination,
    Typography,
} from '@mui/material';
import PostCard, { PostCardProps } from '../../../PostCard';
import React, { useEffect, useState } from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { useDebounce } from 'use-debounce';
import { SearchInput } from '../../../atoms/SearchInput';

const Posts = () => {
    const [params, setParams] = useQueryParams({
        search: StringParam,
        page: NumberParam,
    });
    const { search, page } = params;
    const [searchState, setSearchState] = useState(search);
    const [debounceSearch] = useDebounce(searchState, 500);

    const posts = useMyPostsQuery({
        page,
        search: debounceSearch,
        per_page: 12,
    });
    const postsData = posts.data?.data?.data;

    useEffect(() => {
        if (debounceSearch === search) return;
        setParams({ page: 1, search: debounceSearch });
    }, [debounceSearch, search, setParams]);

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
            <SearchInput
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
            />
            {posts.isLoading ? (
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                renderPosts
            )}
            <Pagination
                count={posts?.data?.data?.last_page}
                onChange={(event, value) => {
                    setParams({ page: value });
                    window.scroll(0, 0);
                }}
                page={page || 1}
                style={{ display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
};

export default Posts;
