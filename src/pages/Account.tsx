import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import EditUserForm from '../components/organisms/EditUserForm/EditUserForm';
import { NumberParam, useQueryParam } from 'use-query-params';

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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
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
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <Container maxWidth="sm">
                    <EditUserForm />
                </Container>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                My posts
            </TabPanel>
        </MainTemplate>
    );
};

export default Account;
