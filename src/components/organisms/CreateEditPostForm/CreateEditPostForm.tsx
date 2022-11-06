import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import WysiwygEditor from '../../../components/organisms/WysiwygEditor/WysiwygEditor';
import { useForm } from 'react-hook-form';
import Input from '../../../components/atoms/Input';
import { Controller } from 'react-hook-form';
import Select from '../../../components/atoms/Select';
import { useCategoriesQuery } from '../../../services/api/hooks/useCategoriesQuery';
import { Box, CircularProgress, Typography } from '@mui/material';
import Button from '../../../components/atoms/Button';
import { useCreatePostMutation } from '../../../services/api/hooks/useCreatePostMutation';
import { Link, useParams } from 'react-router-dom';
import { useSinglePostQuery } from '../../../services/api/hooks/useSinglePostQuery';
import { useEditPostMutation } from '../../../services/api/hooks/useEditPostMutation';
import { ICreatePostRequest } from '../../../services/types';
import { singlePost } from '../../../routing/routes';
import MuiButton from '@mui/material/Button';

// TODO: check types
type FormInputs = ICreatePostRequest;

export interface CreateEditPostFormProps {
    type?: 'create' | 'edit';
}

const CreateEditPostForm: React.FunctionComponent<CreateEditPostFormProps> = (
    props
) => {
    const { type = 'create' } = props;
    const [content, setContent] = useState('');
    const {
        data: categories,
        isLoading: isCategoriesLoading,
        isSuccess: isCategoriesSuccess,
    } = useCategoriesQuery();
    const createPostMutation = useCreatePostMutation();
    const editPostMutation = useEditPostMutation();
    const { slug } = useParams();
    const {
        data: post,
        isLoading: isPostLoading,
        isSuccess: isPostSuccess,
    } = useSinglePostQuery(slug || '', {
        enabled: !!slug && type === 'edit',
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormInputs>({
        defaultValues: {
            title: '',
            content: '',
            category_id: undefined,
        },
    });

    useEffect(() => {
        if (isPostSuccess && isCategoriesSuccess && type === 'edit') {
            reset({
                title: post?.data.title,
                content: post?.data.content,
                category_id: post?.data.category?.id,
            });
            setContent(post?.data.content);
        }
    }, [isPostSuccess, isCategoriesSuccess, type]);

    const onSubmit = handleSubmit((data) =>
        !!slug && type === 'edit'
            ? editPostMutation.mutate({ body: data, slug })
            : createPostMutation.mutate(data)
    );

    if (isPostLoading || isCategoriesLoading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Box sx={{ marginBottom: 5 }}>
                <Typography variant="h4" component="p">
                    {type === 'create' && 'Create post'}
                    {type === 'edit' && `Edit ${post?.data.title}`}
                </Typography>
                {type === 'edit' && !!slug && (
                    <MuiButton
                        component={Link}
                        color="primary"
                        to={singlePost.replace(':slug', slug)}
                        size="small"
                        sx={{ marginTop: 1 }}
                    >
                        Show post
                    </MuiButton>
                )}
            </Box>
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
                {/*TODO: add excerpt input*/}
                <Select
                    name="category_id"
                    control={control}
                    items={categories?.data || []}
                    selectProps={{
                        label: 'Category',
                        disabled: isCategoriesLoading,
                        sx: { marginBottom: 2 },
                        defaultValue: post?.data.category?.id,
                    }}
                    loading={isCategoriesLoading}
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
                                />
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
                    loading={
                        editPostMutation.isLoading ||
                        createPostMutation.isLoading
                    }
                >
                    {type === 'create' && 'Create'}
                    {type === 'edit' && 'Edit'}
                </Button>
            </Box>
        </Box>
    );
};

export default CreateEditPostForm;
