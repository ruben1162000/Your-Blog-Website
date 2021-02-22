import { useHistory } from "react-router-dom";
import axios from "axios";
import formTheme from "../themes/formTheme";
const BlogList = (props) => {
    const token = localStorage.getItem("auth-token");
    const blogs = props.blogs;
    const history = useHistory();
    const { Ltag } = formTheme;

    const deleteBlog = (blogid) => {
        axios.delete(`api/blogs/${blogid}`, {
            headers: { "x-auth-token": token }
        })
            .then(deleted => {
                props.setBlogs(blogs.filter(blog => blog._id != blogid));
            })
            .catch(error => {
                if (error.response) {
                    const { status, data } = error.response;
                    if (status == 500) history.push("/Error500");
                }
            });
    };

    const editPending = (blogid) => {
        history.replace(`/blogEditor/${blogid}`);
    };

    const editPosted = (blogid) => {
        axios.patch(`/api/blogs/${blogid}/unpostBlog`, null, {
            headers: { "x-auth-token": token }
        })
            .then(res => {
                const { status, data } = res;
                if (data.validUpdate)
                    history.replace(`/blogEditor/${blogid}`);
            })
            .catch(error => {
                if (error.response) {
                    const { status, data } = error.response;
                    if (status == 500) history.push("/Error500");
                }
            });

    };

    let blogListTitle;
    switch (props.page) {
        case 0: blogListTitle = "All Blogs";
            break;
        case 1: blogListTitle = "Posted Blogs";
            break;
        case 2: blogListTitle = "Pending Blogs";
            break;
        default:
            break;
    }

    return (
        <div className="blog-list">
            <h1 className="blog-list-title">{blogListTitle}</h1>
            {
                props.page == 0 ?
                    blogs.map((blog) => (
                        <Ltag to={`/viewBlog/${blog._id}`} key={blog._id}>
                            <div className="blog-preview mb-5 rounded">
                                <h2 className="m-3">{blog.title}</h2>
                                <label style={{ color: "#d1045d" }}>&nbsp;&nbsp;&nbsp;<i class="fas fa-calendar-day"></i>&nbsp;{new Date(blog.lastEdit).toDateString()}</label>
                                <blockquote className='ml-2'>-{blog.authorId.username}</blockquote>
                            </div>
                        </Ltag>
                    )) :
                    blogs.map((blog) => (
                        <div className="blog-preview mb-5 rounded" key={blog._id}>
                            <h2 className="m-3">{blog.title}</h2>
                            <label style={{ color: "#d1045d" }}>&nbsp;&nbsp;&nbsp;<i class="fas fa-calendar-day"></i>&nbsp;{new Date(blog.lastEdit).toDateString()}</label>
                            <blockquote className='ml-3'>&mdash;&nbsp;{blog.authorId.username}</blockquote>
                            <div className="btn-group ml-3 my-2">
                                <Ltag to={`/viewBlog/${blog._id}`} className="btn btn-primary"><i className="fas fa-eye"></i></Ltag>
                                <button className="btn btn-success" onClick={() => props.page == 1 ? editPosted(blog._id) : editPending(blog._id)}>&nbsp;<i className="fas fa-edit"></i></button>
                                <button className="btn btn-danger" onClick={() => deleteBlog(blog._id)}><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default BlogList;