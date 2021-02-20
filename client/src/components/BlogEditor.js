import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams, useHistory } from 'react-router-dom';

const BlogEditor = () => {
    const { blogid } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [lastEdit, setLastEdit] = useState("");
    const [title, setTitle] = useState("");
    const history = useHistory();
    const token = localStorage.getItem("auth-token");
    if (!token)
        history.replace("/");

    const postTheBlog = async () => {
        try {
            const rawContentState = convertToRaw(editorState.getCurrentContent());
            const markup = draftToHtml(rawContentState);
            const { status, data } = await axios.patch(`/api/blogs/${blogid}/saveBlog`, { blogTitle: title, blogBody: markup }, {
                headers: { "x-auth-token": token }
            });
            if (data.validUpdate) {
                setLastEdit(data.lastEdit);
                const { status, data: nextData } = await axios.patch(`/api/blogs/${blogid}/postBlog`, null, {
                    headers: { "x-auth-token": token }
                });
                if (nextData.validUpdate) {
                    history.replace("/postedBlogs");
                }
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status == 500) history.push("/Error500");
            }
        };
    };

    const saveBody = async () => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        try {
            const { status, data } = await axios.patch(`/api/blogs/${blogid}/saveBody`, { blogBody: markup }, {
                headers: { "x-auth-token": token }
            });
            if (data.validUpdate)
                setLastEdit(data.lastEdit);
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status == 500) history.push("/Error500");
            }
        };
    };

    const saveTitle = async () => {
        try {
            const { status, data } = await axios.patch(`/api/blogs/${blogid}/saveTitle`, { blogTitle: title }, {
                headers: { "x-auth-token": token }
            });
            if (data.validUpdate)
                setLastEdit(data.lastEdit);
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status == 500) history.push("/Error500");
            }
        };
    }

    const uploadCallback = (file) => {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append("uploadimg", file);
            axios.post(`/api/images/${token}/${blogid}`, data)
                .then(responseImage => {
                    resolve({ data: { link: responseImage.data.url } });
                });
        });
    };

    useEffect(() => {
        axios.get(`/api/blogs/${blogid}`, {
            headers: { "x-auth-token": token }
        })
            .then(res => {
                const { status, data } = res;
                setTitle(data.title);
                setLastEdit(data.lastEdit);
                const contentBlock = htmlToDraft(data.body);
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState);
            })
            .catch(error => {
                if (error.response) {
                    const { status, data } = error.response;
                    if (status == 500) history.push("/Error500");
                }
            });
    }, []);

    return (
        <div className="blog-editor m-3">
            <input type="text" className="mb-2" value={title} required onChange={(e) => { setTitle(e.target.value); saveTitle(); }} />
            <label>&nbsp;&nbsp;&nbsp;Last Save : {lastEdit}</label>
            <Editor
                editorState={editorState}
                wrapperClassName="m-5"
                editorClassName="bg-light p-1"
                // toolbarClassName="toolbarClassName"
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
                onEditorStateChange={(newEditorState) => { setEditorState(newEditorState); saveBody(); }}
            />
            <button className="btn btn-info" onClick={postTheBlog}>Post Blog!!</button>
        </div>
    );
}

export default BlogEditor;