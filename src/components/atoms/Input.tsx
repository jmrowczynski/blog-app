import { TextField, TextFieldProps } from '@mui/material';
import { Controller, ControllerProps } from 'react-hook-form';
import React from 'react';

export interface IInput {
    control: any;
    name: string;
    controllerProps?: Omit<ControllerProps, any>;
    inputProps?: TextFieldProps;
}

const Input: React.FunctionComponent<IInput> = ({
    control,
    name,
    controllerProps,
    inputProps,
}) => {
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
