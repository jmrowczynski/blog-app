import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { home, singlePost } from './routes';
import SinglePost from '../pages/SinglePost';

const Routing = () => {
    return (
        <Routes>
            <Route index path={home} element={<Home />} />
            <Route path={singlePost} element={<SinglePost />} />
        </Routes>
    );
};

export default Routing;
