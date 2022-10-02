import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import ImagesApi from '../../../services/api/connections/ImagesApi';

const WysiwygEditor = ({
    value,
    setValue,
}: {
    value: string;
    setValue: (content: string) => void;
}) => {
    let quillRef = useRef<any>(null);

    const imageHandler = () => {
        const input = document.createElement('input') as any;

        if (!quillRef) return;

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        const quill = quillRef.current.getEditor();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('image', file);

            // Save current cursor state
            const range = quill.getSelection(true);

            // Insert temporary loading placeholder image
            quill.insertText(range.index, 'Loading image...');

            // Move cursor to right side of image (easier to continue typing)
            quill.setSelection(range.index + 1);

            const res = await ImagesApi.upload(formData); // API post, returns image location as string

            // Remove placeholder image
            quill.deleteText(range.index, 16);

            // Insert uploaded image
            quill.insertEmbed(range.index, 'image', res.data.image_url);
        };
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote', 'code-block'],

                    [{ list: 'ordered' }, { list: 'bullet' }],

                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ align: [] }],
                    ['image'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }),
        []
    );
    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
        />
    );
};

export default WysiwygEditor;
