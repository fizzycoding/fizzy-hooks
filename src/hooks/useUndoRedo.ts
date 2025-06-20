import { useCallback, useState } from "react";

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
 * A React hook for undo/redo functionality.
 *
 * @param initialValue Initial state value
 * @returns \{ state, set, undo, redo, clear, canUndo,canRedo }
 */

function useUndoRedo<T>(initialValue: T): UndoRedo<T> {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialValue);
  const [future, setFuture] = useState<T[]>([]);

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
  }, [initialValue]);

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
export default useUndoRedo;
