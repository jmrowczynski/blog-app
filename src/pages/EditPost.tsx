import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import 'react-quill/dist/quill.snow.css';
import CreateEditPostForm from '../components/organisms/CreateEditPostForm/CreateEditPostForm';

const EditPost = () => {
    return (
        <MainTemplate>
            <CreateEditPostForm type="edit" />
        </MainTemplate>
    );
};

export default EditPost;
