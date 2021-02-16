import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const BlogEditor = () => {
    const uploadCallback = (file) => {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append("uploadimg", file)
            axios.post("http://localhost:5000/testupload", data).then(responseImage => {
                resolve({ data: { link: responseImage.url } });
            })
        });
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    return (
        <div className="blog-editor m-3">
            <Editor
                editorState={editorState}
                wrapperClassName="m-5"
                editorClassName="bg-light"
                // toolbarClassName="toolbarClassName"
                // wrapperClassName="wrapperClassName"
                // editorClassName="editorClassName"
                toolbar={{

                    image: {
                        uploadEnabled: true,
                        uploadCallback: uploadCallback,
                        previewImage: true,
                        inputAccept: 'image/jpeg,image/jpg,image/png',
                        alt: { present: false, mandatory: false },
                        defaultSize: {
                            height: 'auto',
                            width: 'auto',
                        },
                    },
                }}
                onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
            />
        </div>
    );
}

export default BlogEditor;