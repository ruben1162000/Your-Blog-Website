import { useParams } from "react-router-dom";
import useFetch from '../hooks/useFetch';

const ViewBlog = () => {
    const { blogid } = useParams();
    const { data: blog, isLoading, loadError } = useFetch(`../api/general/allblogs/${blogid}`);
    return (
        <div>
            {loadError && <div>{loadError}</div>}
            {isLoading && <div>Loading...</div>}
            {
                blog &&
                <article className="blog-details m-5 p-3 rounded">
                    <h2>{blog.title}</h2>
                    <p>&mdash; {blog.authorId.username}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.body }}>
                    </div>
                    <div>{blog.lastEdit}</div>
                </article>
            }
        </div>
    );
}

export default ViewBlog;