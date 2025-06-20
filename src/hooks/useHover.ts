import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefCallback,
} from "react";
/**
 * useHover Hook
 *
 * Tracks hover state of an element.
 *
 * @returns [ref, isHovered] — the ref to attach and hover state.
 */

function useHover<T extends HTMLElement = HTMLElement>(): [
  RefCallback<T>,
  boolean
] {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<T | null>(null);

  const refCallback = useCallback((node: T | null) => {
    if (ref.current) {
      ref.current.removeEventListener("mouseenter", handleMouseEnter);
      ref.current.removeEventListener("mouseleave", handleMouseLeave);
    }
    ref.current = node;

    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);
    }
  }, []);
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", handleMouseEnter);
        ref.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return [refCallback, isHovered];
}

export default useHover;
