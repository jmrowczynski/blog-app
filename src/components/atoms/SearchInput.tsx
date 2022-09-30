import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

export const SearchInput: React.FunctionComponent<{
    value?: string | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => {
    return (
        <TextField
            style={{ marginBottom: '2rem' }}
            fullWidth
            value={value}
            onChange={onChange}
            label="Search"
        />
    );
};
