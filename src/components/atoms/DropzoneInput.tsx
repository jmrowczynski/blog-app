import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { Box } from '@mui/material';

export interface DropzoneInputProps {
    onChange: (files: any) => void;
}

export const DropzoneField = ({
    name,
    control,
    ...rest
}: {
    name: string;
    control: any;
}) => {
    return (
        <Controller
            render={({ field: { onChange } }) => (
                <DropzoneInput
                    onChange={(files: any) => {
                        onChange(files);
                    }}
                    {...rest}
                />
            )}
            name={name}
            control={control}
            defaultValue=""
        />
    );
};

const DropzoneInput: React.FunctionComponent<DropzoneInputProps> = ({
    onChange,
}) => {
    const onDrop = useCallback((acceptedFiles: any) => {
        onChange(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Box
                sx={{
                    border: '1px dashed gray',
                    borderRadius: 1,
                    padding: 1,
                }}
            >
                {isDragActive ? (
                    <div>Drop the files here ...</div>
                ) : (
                    <div>
                        Drag 'n' drop some files here, or click to select files
                    </div>
                )}
            </Box>
        </div>
    );
};

export default DropzoneInput;
