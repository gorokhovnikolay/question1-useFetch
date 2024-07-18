import { useEffect, useState, useCallback } from 'react';

export const useFetch = (url) => {
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [fetchUrl, setFetchURL] = useState(url);

    useEffect(() => {
        setIsloading(true);
        fetch(fetchUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }
                setError(false);
                return response.json();
            })
            .then((fetchData) => {
                setData(fetchData);
                setIsloading(false);
            })
            .catch(() => {
                setError(true);
                setIsloading(false);
            })
            .finally(() => {
                setIsloading(false);
            });
    }, [fetchUrl]);

    const refetch = useCallback(
        ({ params }) => {
            setFetchURL(url + '?' + new URLSearchParams(params).toString());
        },
        [url],
    );

    return { data, isLoading, error, refetch };
};
