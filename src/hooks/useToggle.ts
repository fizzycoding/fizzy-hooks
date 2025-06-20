import { useCallback, useState } from "react";

/**
 * useToggle Hook
 *
 * @param initialValue - Initial boolean state (default: false)
 * @returns [state, toggle, setTrue, setFalse]
 */

function useToggle(
  initialValue = false
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setFalse = useCallback(() => setValue(false), []);
  const setTrue = useCallback(() => setValue(true), []);

  return [value, toggle, setTrue, setFalse];
}

export default useToggle;
