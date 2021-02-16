import { useParams } from "react-router-dom";
import useFetch from '../hooks/useFetch';

const ViewBlog = () => {
    const { blogid } = useParams;
    const { data: blog, isLoading, loadError } = useFetch(`api/general/allblogs/${blogid}`);
    return (
        <div>
            {loadError && <div>{loadError}</div>}
            {isLoading && <div>Loading...</div>}
            {
                blog &&
                <article className="blog-details">
                    <h2>{blog.title}</h2>
                    <p>&mdash; {blog.authorId.username}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.body }}>
                    </div>
                </article>
            }
        </div>
    );
}

export default ViewBlog;