import React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { omit } from '../../utils/omit';

interface IButton extends ButtonProps {
    loading?: boolean;
}

const Button: React.FunctionComponent<IButton> = (props) => {
    return (
        <MuiButton {...omit(['children'], props)}>
            {props.children}
            {props.loading && (
                <CircularProgress
                    size={12}
                    sx={{ marginLeft: 1 }}
                    color="inherit"
                />
            )}
        </MuiButton>
    );
};

export default Button;
