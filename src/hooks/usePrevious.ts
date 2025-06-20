import { useEffect, useRef } from "react";
/**
 * usePrevious Hook
 *
 * Stores the previous value of a variable.
 *
 * @param value - Current value
 * @returns Previous value
 */

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
