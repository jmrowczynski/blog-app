import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { home } from './routes';

const Routing = () => {
    return (
        <Routes>
            <Route exact path={home} element={<Home />} />
        </Routes>
    );
};

export default Routing;
