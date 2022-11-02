import React from 'react';
import { useParams } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import { useSinglePostQuery } from '../services/api/hooks/useSinglePostQuery';
import { CircularProgress, Typography } from '@mui/material';
import Dompurify from 'dompurify';
import ContentWrapper from '../components/organisms/ContentWrapper';

const SinglePost = () => {
    const { slug } = useParams();
    const { data, isLoading } = useSinglePostQuery(slug || '', {
        enabled: !!slug,
    });

    if (isLoading) {
        return (
            <MainTemplate>
                <CircularProgress />
            </MainTemplate>
        );
    }

    if (data?.data) {
        return (
            <MainTemplate>
                <Typography variant="h2" component="h1" gutterBottom>
                    {data.data.title}
                </Typography>
                <ContentWrapper
                    dangerouslySetInnerHTML={{
                        __html: Dompurify.sanitize(data.data.content),
                    }}
                />
            </MainTemplate>
        );
    }

    return <MainTemplate>Post not found</MainTemplate>;
};

export default SinglePost;
