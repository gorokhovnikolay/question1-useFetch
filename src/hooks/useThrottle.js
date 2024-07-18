import { useEffect, useState, useRef } from 'react';

export const useThrottle = (value, interval) => {
    const [throtleValue, setThrotleValue] = useState(value);
    const intervalRef = useRef(Date.now());

    useEffect(() => {
        if (Date.now() - intervalRef.current >= interval) {
            setThrotleValue(value);
            intervalRef.current = Date.now();
        } else {
            const timer = setTimeout(() => {
                setThrotleValue(value);
            }, interval);
            return clearTimeout(timer);
        }
    }, [interval, value]);

    return throtleValue;
};
