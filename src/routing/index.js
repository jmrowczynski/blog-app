import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { home, singlePost, login } from './routes';
import SinglePost from '../pages/SinglePost';
import Login from '../pages/Login';

const Routing = () => {
    return (
        <Routes>
            <Route index path={home} element={<Home />} />
            <Route path={singlePost} element={<SinglePost />} />
            <Route path={login} element={<Login />} />
        </Routes>
    );
};

export default Routing;
