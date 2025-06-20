/**
 * useThrottle Hook
 *
 * Returns a throttled version of the value that only updates once every `limit` ms.
 *
 * @param value - The input value to throttle
 * @param limit - The delay in milliseconds (default: 500ms)
 * @returns Throttled value
 */

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, limit: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

export default useThrottle;
