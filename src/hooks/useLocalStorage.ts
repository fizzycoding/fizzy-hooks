import { useState, useEffect } from "react";

/**
 * useLocalStorage Hook
 *
 * Syncs state with localStorage
 *
 * @param key - The key to store the value under
 * @param initialValue - The default value if localStorage is empty
 * @returns [value, setValue, removeValue]
 */

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("useLocalStorage read error", error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn("useLocalStorage write error", error);
    }
  };
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn("useLocalStorage remove error", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window === "undefined") return initialValue;
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.warn("useLocalStorage sync error", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
