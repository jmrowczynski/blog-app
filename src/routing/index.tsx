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
    createPost,
    editPost,
    register,
} from './routes';
import SinglePost from '../pages/SinglePost';
import Login from '../pages/Login';
import Protect from './utils/Protect';
import Account from '../pages/Account';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import { useAppContext } from '../context/app.context';
import Register from '../pages/Register';

const Routing = () => {
    const { token, user } = useAppContext();
    const isLoggedIn = !!token && !!user;

    return (
        <Routes>
            <Route index={false} path={home} element={<Home />} />
            <Route path={singlePost} element={<SinglePost />} />
            <Route
                path={login}
                element={
                    <Protect rules={[!isLoggedIn]}>
                        <Login />
                    </Protect>
                }
            />
            <Route
                path={register}
                element={
                    <Protect rules={[!isLoggedIn]}>
                        <Register />
                    </Protect>
                }
            />
            <Route
                path={account}
                element={
                    <Protect rules={[isLoggedIn]}>
                        <Account />
                    </Protect>
                }
            />
            <Route
                path={createPost}
                element={
                    <Protect rules={[isLoggedIn]}>
                        <CreatePost />
                    </Protect>
                }
            />
            <Route
                path={editPost}
                element={
                    <Protect rules={[isLoggedIn]} permissions={['edit_post']}>
                        <EditPost />
                    </Protect>
                }
            />
            <Route
                path={forgotPassword}
                element={
                    <Protect rules={[!isLoggedIn]}>
                        <ForgotPassword />
                    </Protect>
                }
            />
            <Route
                path={resetPassword}
                element={
                    <Protect rules={[!isLoggedIn]}>
                        <ResetPassword />
                    </Protect>
                }
            />
        </Routes>
    );
};

export default Routing;
