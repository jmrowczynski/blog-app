import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const Input = ({ control, name, controllerProps, inputProps }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, name, value } }) => (
                <TextField
                    onChange={onChange}
                    name={name}
                    value={value}
                    {...inputProps}
                />
            )}
            {...controllerProps}
        />
    );
};

export default Input;

Input.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.any,
    controllerProps: PropTypes.any,
    inputProps: PropTypes.any,
};
