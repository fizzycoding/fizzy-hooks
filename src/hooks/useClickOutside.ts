import { useEffect, useRef } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * useClickOutside Hook
 *
 * Detects clicks outside the provided ref and triggers the handler.
 *
 * @param handler - Function to call when outside click occurs
 * @returns ref - Attach this to the element you want to monitor
 */

function useClickOutside<T extends HTMLElement>(handler: Handler) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const listner = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listner);
    document.addEventListener("touchstart", listner);
    return () => {
      document.removeEventListener("mousedown", listner);
      document.removeEventListener("touchstart", listner);
    };
  }, [handler]);

  return ref;
}

export default useClickOutside;
