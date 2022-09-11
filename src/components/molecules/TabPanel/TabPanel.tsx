import { Box, Typography } from '@mui/material';
import React from 'react';

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value?: number | null;
}

const TabPanel = (props: TabPanelProps) => {
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
};

export default TabPanel;
