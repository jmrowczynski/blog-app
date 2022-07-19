import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import { Container } from '@mui/material';
import EditUserForm from '../components/organisms/EditUserForm/EditUserForm';

const Account = () => {
    return (
        <MainTemplate>
            <Container maxWidth="sm">
                <EditUserForm />
            </Container>
        </MainTemplate>
    );
};

export default Account;
