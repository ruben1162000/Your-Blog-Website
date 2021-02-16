import { Link } from "react-router-dom";

const BlogList = (props) => {
    const blogs = props.blogs;
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
                        <Link to={`/viewBlog/${blog._id}`}>
                            <div className="blog-preview mb-5 rounded" key={blog._id}>
                                <h2 className="m-3">{blog.title}</h2>
                                <blockquote className='ml-2'>-{blog.authorId.username}</blockquote>
                            </div>
                        </Link>
                    )) :
                    blogs.map((blog) => (
                        <div className="blog-preview mb-5 rounded" key={blog._id}>
                            <h2 className="m-3">{blog.title}</h2>
                            <blockquote className='ml-2'>-{blog.authorId.username}</blockquote>
                            <div className="btn-group">
                                <Link to={`/viewBlog/${blog._id}`} className="btn btn-primary">View</Link>
                                <Link to={`/viewBlog/${blog._id}`} className="btn btn-primary">Edit</Link>
                                <Link to={`/viewBlog/${blog._id}`} className="btn btn-primary">Delete</Link>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default BlogList;