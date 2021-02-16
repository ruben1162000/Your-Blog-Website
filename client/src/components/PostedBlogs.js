import BlogList from './BlogList';
import useFetch from '../hooks/useFetch';
import { useContext } from 'react';
const PostedBlogs = () => {
    const { userData, setUserData } = useContext("UserContext");
    const { data: blogs, isLoading, loadError } = useFetch("api/blogs/postedBlogs", { "x-auth-token": userData.token });
    return (
        <div className="mx-5">
            {loadError && <div>{loadError}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} page={1} />}
        </div>
    );
}

export default PostedBlogs;