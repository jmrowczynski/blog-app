import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import 'react-quill/dist/quill.snow.css';
import CreateEditPostForm from '../components/organisms/CreateEditPostForm/CreateEditPostForm';

const CreatePost = () => {
    return (
        <MainTemplate>
            <CreateEditPostForm />
        </MainTemplate>
    );
};

export default CreatePost;
