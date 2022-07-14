import React from 'react';
import ApplicationBar from '../components/ApplicationBar';
import { Container } from '@mui/material';

const MainTemplate: React.FunctionComponent<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div>
            <ApplicationBar />
            <Container style={{ marginTop: '7rem', marginBottom: '7rem' }}>
                {children}
            </Container>
        </div>
    );
};

export default MainTemplate;
