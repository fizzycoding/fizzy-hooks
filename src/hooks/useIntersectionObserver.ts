import { useEffect, useRef, useState } from "react";

type ObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

/**
 * useIntersectionObserver
 *
 * Custom hook to observe the intersection (visibility) of a DOM element using the Intersection Observer API.
 *
 * @param options - Intersection observer options (root, rootMargin, threshold).
 * @returns An object containing:
 *   - `ref`: a ref to assign to the target element,
 *   - `entry`: the latest IntersectionObserverEntry,
 *   - `isIntersecting`: boolean indicating if the element is currently visible in the viewport.
 */

function useIntersectionObserver<T extends HTMLElement>(
  options?: ObserverOptions
) {
  const targetRef = useRef<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? "0px",
        threshold: options?.threshold ?? 0,
      }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [options?.root, options?.rootMargin, options?.threshold]);

  return {
    ref: targetRef,
    entry,
    isIntersecting: entry?.isIntersecting ?? false,
  };
}

export default useIntersectionObserver;
