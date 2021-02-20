import { useState, useEffect } from 'react';
const useFetch = (url, headers = {}, method = 'GET', onsuccess = (data) => { }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, { signal: abortCont.signal, headers, method })
            .then(res => {
                // console.log(res);
                if (!res.ok) {
                    throw Error(`Could not fetch the data from ${res.url}`);
                }
                return res.json();
            })
            .then(data => {
                // console.log(data);
                setIsLoading(false);
                setData(data);
                onsuccess(data);
            })
            .catch(err => {
                // console.log(err);
                if (err.name === 'AbortError') {
                    // console.log("Fetch aborted on component unmounting");
                } else {
                    setIsLoading(false);
                    setLoadError(err.message);
                }
            })
        return () => abortCont.abort();
    }, []);
    return { data, isLoading, loadError, setData }
}

export default useFetch;