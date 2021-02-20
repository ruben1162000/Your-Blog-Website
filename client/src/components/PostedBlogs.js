import BlogList from './BlogList';
import useFetch from '../hooks/useFetch';
import { useHistory } from 'react-router-dom';
const PostedBlogs = () => {
    const token = localStorage.getItem("auth-token");
    const history = useHistory();
    if (!token) {
        history.replace("/");
    }
    const { data: blogs, isLoading, loadError, setData: setBlogs } = useFetch("api/blogs/postedBlogs", { "x-auth-token": token });
    return (
        <div className="mx-5">
            {loadError && <div>{loadError}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} setBlogs={setBlogs} page={1} />}
        </div>
    );
}

export default PostedBlogs;