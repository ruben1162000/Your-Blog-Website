import BlogList from './BlogList';
import useFetch from '../hooks/useFetch';

const Home = () => {
    const { data: blogs, isLoading, loadError } = useFetch("api/general/allblogs");
    return (
        <div className="mx-5">
            {loadError && <div>{loadError}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} page={0} />}
        </div>
    );
}

export default Home;