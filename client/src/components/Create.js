import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Create = () => {
    const history = useHistory();
    const token = localStorage.getItem("auth-token");
    if (!token) {
        history.replace("/");
    }

    const { data, isLoading, loadError } = useFetch(`/api/blogs/create`, { "x-auth-token": token }, "POST", (data) => { history.replace(`/blogEditor/${data.blogid}`); });

    // useEffect(() => {
    //     if (data !== null)
    //         if (data.blogid) {
    //             history.replace(`/blogEditor/${data.blogid}`);
    //         }
    // }, [data]);
    return (
        <div className="mx-5">
            {loadError && <div>{loadError}</div>}
            {isLoading && <div>Creating...</div>}
        </div>
    );
}

export default Create;