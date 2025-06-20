import { useEffect, useRef } from "react";

/**
 * useInterval Hook
 *
 * Repeatedly calls the callback at a given delay and returns a function to clear the interval manually.
 *
 * @param callback - Function to call on each interval tick
 * @param delay - Delay in milliseconds (default is 0)
 * @returns clear - A function to manually clear the interval
 */

function useInterval(callback: () => void, delay: number = 0) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [delay]);

  const clear = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return clear;
}

export default useInterval;
