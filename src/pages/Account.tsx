import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { NumberParam, useQueryParam } from 'use-query-params';
import { useAppContext } from '../context/app.context';
import Users from '../components/pages/MyAccount/Users/Users';
import Posts from '../components/pages/MyAccount/Posts/Posts';
import Settings from '../components/pages/MyAccount/Settings/Settings';
import { Navigate } from 'react-router-dom';
import { account } from '../routing/routes';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value?: number | null;
}

function TabPanel(props: TabPanelProps) {
    const { children, value = 0, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Account = () => {
    const [tab, setTab] = useQueryParam('tab', NumberParam);
    const { isAdmin } = useAppContext();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    if (tab === 2 && !isAdmin) {
        return <Navigate replace to={account} />;
    }

    return (
        <MainTemplate>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tab ?? 0}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="General" />
                    <Tab label="My posts" />
                    {isAdmin && <Tab label="Users" />}
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <Container maxWidth="sm">
                    <Settings />
                </Container>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Posts />
            </TabPanel>
            {isAdmin && (
                <TabPanel value={tab} index={2}>
                    <Users />
                </TabPanel>
            )}
        </MainTemplate>
    );
};

export default Account;
