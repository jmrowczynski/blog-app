import {
    FormControl,
    InputLabel,
    MenuItem,
    SelectProps,
    Select as MuiSelect,
    CircularProgress,
} from '@mui/material';
import { Controller, ControllerProps } from 'react-hook-form';
import React from 'react';

export interface ISelect {
    control: any;
    name: string;
    controllerProps?: Omit<ControllerProps, any>;
    selectProps?: SelectProps;
    items: { id: number; name: string }[];
    loading?: boolean;
}

const Select: React.FunctionComponent<ISelect> = ({
    control,
    name,
    controllerProps,
    selectProps,
    items,
    loading,
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={selectProps?.id}>{selectProps?.label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, name, value } }) => (
                    <>
                        <MuiSelect
                            onChange={(e) => onChange(e.target.value)}
                            name={name}
                            value={value}
                            {...selectProps}
                            {...(loading && { IconComponent: undefined })}
                        >
                            {items.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </MuiSelect>
                    </>
                )}
                {...controllerProps}
            />
            {loading && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'white',
                        opacity: 0.6,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress
                        size={14}
                        color="inherit"
                        sx={{ marginRight: 2 }}
                    />
                </div>
            )}
        </FormControl>
    );
};

export default Select;
