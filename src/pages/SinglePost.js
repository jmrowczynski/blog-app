import React from 'react';
import { useParams } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';

const SinglePost = () => {
    const { slug } = useParams();
    return <MainTemplate>Post slug: {slug}</MainTemplate>;
};

export default SinglePost;
