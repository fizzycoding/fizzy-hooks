import { useEffect, useRef } from "react";

/**
 * useTimeout Hook
 *
 * Calls the callback after a delay, and returns a function to clear the timeout manually.
 *
 * @param callback - Function to run after the delay
 * @param delay - Delay in milliseconds (default is 0)
 * @returns clear - A function to manually clear the timeout
 */

function useTimeout(callback: () => void, delay: number = 0) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [delay]);

  const clear = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return clear;
}

export default useTimeout;
