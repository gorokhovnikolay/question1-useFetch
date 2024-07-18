import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback, delay, dep) => {
    const callbackRef = useRef();
    const timer = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const start = useCallback(() => {
        timer.current = setTimeout(() => {
            callbackRef.current();
        }, delay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay, ...dep]);

    const stop = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }, []);

    const reset = useCallback(() => {
        stop();
        start();
    }, [start, stop]);

    useEffect(() => {
        start();
        return stop;
    }, [start, stop]);

    return { stop, reset };
};
