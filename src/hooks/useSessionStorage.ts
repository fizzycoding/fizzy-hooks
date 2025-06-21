import { useEffect, useState } from "react";

/**
 * useSessionStorage Hook
 *
 * Syncs state with sessionStorage
 *
 * @param key - The key to store the value under
 * @param initialValue - The default value if sessionStorage is empty
 * @returns [value, setValue, removeValue]
 */
function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("useSessionStorage read error", error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn("useSessionStorage write error", error);
    }
  };

  const removeValue = () => {
    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn("useSessionStorage remove error", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window === "undefined") return;
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

  return [storedValue, setValue, removeValue];
}

export default useSessionStorage;
