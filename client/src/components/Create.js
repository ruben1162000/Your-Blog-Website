import useFetch from '../hooks/useFetch';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
    const { userData, setUserData } = useContext("UserContext");
    const { data, isLoading, loadError } = useFetch(`api/blogs/create`, { "x-auth-token": userData.token }, "POST");
    const history = useHistory();
    useEffect(() => {
        if (data) {
            history.replace(`blogEditor/${data.blogid}`);
        }
    }, [data]);
    return (
        <div className="mx-5">
            {loadError && <div>{loadError}</div>}
            {isLoading && <div>Creating...</div>}
        </div>
    );
}

export default Create;