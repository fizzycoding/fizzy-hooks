import { useState, useEffect } from "react";

/**
 * useSessionStorage Hook
 *
 * Syncs state with sessionStorage
 *
 * @param key - The key to store the value under
 * @param initialValue - The default value if sessionStorage is empty
 * @returns [value, setValue]
 */
function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("useSessionStorage read error", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("useSessionStorage write error", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.sessionStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.warn("useSessionStorage sync error", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export default useSessionStorage;
