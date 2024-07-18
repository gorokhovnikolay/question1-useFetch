import { useEffect, useState } from 'react';

const getData = (key) => JSON.parse(localStorage.getItem(key));

export const useLocalStorage = (key, initialState) => {
    const [value, setValue] = useState(() => {
        if (getData(key)) {
            return getData(key);
        }
        if (initialState instanceof Function) {
            return initialState();
        }
        return initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
