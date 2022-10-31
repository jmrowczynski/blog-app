import React, { useState } from 'react';
import MainTemplate from '../templates/MainTemplate';
import 'react-quill/dist/quill.snow.css';
import WysiwygEditor from '../components/organisms/WysiwygEditor/WysiwygEditor';
import { useForm } from 'react-hook-form';
import Input from '../components/atoms/Input';
import { Controller } from 'react-hook-form';
import Select from '../components/atoms/Select';
import { useCategoriesQuery } from '../services/api/hooks/useCategoriesQuery';
import { Box } from '@mui/material';
import Button from '../components/atoms/Button';

interface FormInputs {
    title: string;
    content: string;
    category_id?: number;
}

const CreatePost = () => {
    const [content, setContent] = useState('');
    const { data: categories, isLoading } = useCategoriesQuery();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            title: '',
            content: '',
            category_id: undefined,
        },
    });

    console.log(errors);

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <MainTemplate>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    '& .MuiTextField-root': { mb: 2 },
                }}
                onSubmit={onSubmit}
            >
                <Input
                    name="title"
                    control={control}
                    inputProps={{
                        fullWidth: true,
                        required: true,
                        label: 'Title',
                        error: !!errors?.title?.message,
                        helperText: errors?.title?.message,
                        sx: { marginBottom: 2 },
                    }}
                    controllerProps={{
                        rules: {
                            required: 'Title is required',
                        },
                    }}
                />
                <Select
                    name="category_id"
                    control={control}
                    items={categories?.data || []}
                    selectProps={{
                        label: 'Category',
                        disabled: isLoading,
                        sx: { marginBottom: 2 },
                    }}
                    loading={isLoading}
                />
                <Controller
                    name="content"
                    control={control}
                    render={(props) => {
                        return (
                            <Box sx={{ marginBottom: 2 }}>
                                <WysiwygEditor
                                    value={content}
                                    setValue={(content) => {
                                        props.field.onChange(content);
                                        setContent(content);
                                    }}
                                />{' '}
                            </Box>
                        );
                    }}
                    rules={{ required: 'Content is required' }}
                />
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    type="submit"
                >
                    Create
                </Button>
            </Box>
        </MainTemplate>
    );
};

export default CreatePost;
