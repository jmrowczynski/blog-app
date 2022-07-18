import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { home, singlePost, login, account } from './routes';
import SinglePost from '../pages/SinglePost';
import Login from '../pages/Login';
import Protect from './utils/Protect';
import Account from '../pages/Account';

const Routing = () => {
    return (
        <Routes>
            <Route index path={home} element={<Home />} />
            <Route path={singlePost} element={<SinglePost />} />
            <Route
                path={login}
                element={
                    <Protect rules={['not_logged_in']}>
                        <Login />
                    </Protect>
                }
            />
            <Route
                path={account}
                element={
                    <Protect rules={['logged_in']}>
                        <Account />
                    </Protect>
                }
            />
        </Routes>
    );
};

export default Routing;
