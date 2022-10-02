import React, { useState } from 'react';
import MainTemplate from '../templates/MainTemplate';
import 'react-quill/dist/quill.snow.css';
import WysiwygEditor from '../components/organisms/WysiwygEditor/WysiwygEditor';
import { useForm } from 'react-hook-form';
import Input from '../components/atoms/Input';
import { Controller } from 'react-hook-form';

interface FormInputs {
    title: string;
    content: string;
}

const CreatePost = () => {
    const [content, setContent] = useState('');

    const {
        control,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            title: '',
            content: '',
        },
    });

    return (
        <MainTemplate>
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
            <Controller
                name="content"
                control={control}
                render={(props) => {
                    return (
                        <WysiwygEditor
                            value={content}
                            setValue={(content) => {
                                props.field.onChange(content);
                                setContent(content);
                            }}
                        />
                    );
                }}
                rules={{ required: 'Content is required' }}
            />
        </MainTemplate>
    );
};

export default CreatePost;
