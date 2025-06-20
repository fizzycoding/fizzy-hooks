import { useCallback, useEffect, useRef, useState } from "react";

type UndoRedo<T> = {
  state: T;
  set: (value: T) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

/**
 * useUndoRedoPersist
 *
 * A React hook for undo/redo functionality with state persistence via localStorage.
 *
 * @param initialValue Initial state value
 * @param key Optional localStorage key (default : useUndoRedoPersist)
 * @returns \{ state, set, undo, redo, clear, canUndo,canRedo }
 */

function useUndoRedoPersist<T>(initialValue: T, key?: string): UndoRedo<T> {
  const storageKey = key ?? "useUndoRedoPersist";
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialValue);
  const [future, setFuture] = useState<T[]>([]);
  const loadedRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (
          Array.isArray(parsed.past) &&
          parsed.present !== undefined &&
          Array.isArray(parsed.future)
        ) {
          setPast(parsed.past);
          setPresent(parsed.present);
          setFuture(parsed.future);
          setTimeout(() => (loadedRef.current = true), 0);
        }
      } catch (error) {
        console.error("Failed to load state from localStorage", error);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (!loadedRef.current) return;
    localStorage.setItem(storageKey, JSON.stringify({ past, present, future }));
  }, [past, present, future]);

  const set = useCallback(
    (value: T) => {
      setPast((prev) => [...prev, present]);
      setPresent(value);
      setFuture([]);
    },
    [present]
  );

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setPast(newPast);
    setFuture((f) => [present, ...f]);
    setPresent(previous);
  }, [past, present]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast((p) => [...p, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [future, present]);

  const clear = useCallback(() => {
    setPast([]);
    setFuture([]);
    setPresent(initialValue);
    localStorage.removeItem(storageKey);
  }, [initialValue, storageKey]);

  return {
    state: present,
    set,
    undo,
    redo,
    clear,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}
export default useUndoRedoPersist;
