import React from 'react';
import { useParams } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';

const SinglePost = () => {
    const { id } = useParams();
    return <MainTemplate>Post id: {id}</MainTemplate>;
};

export default SinglePost;
