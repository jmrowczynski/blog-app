import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import {
    home,
    singlePost,
    login,
    account,
    forgotPassword,
    resetPassword,
} from './routes';
import SinglePost from '../pages/SinglePost';
import Login from '../pages/Login';
import Protect from './utils/Protect';
import Account from '../pages/Account';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

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
            <Route
                path={forgotPassword}
                element={
                    <Protect rules={['not_logged_in']}>
                        <ForgotPassword />
                    </Protect>
                }
            />
            <Route
                path={resetPassword}
                element={
                    <Protect rules={['not_logged_in']}>
                        <ResetPassword />
                    </Protect>
                }
            />
        </Routes>
    );
};

export default Routing;
