import { useCallback, useEffect, useState, useRef } from "react";

type AsyncState<T> = {
  value: T | null;
  loading: boolean;
  error: string | null;
};

type UseAsyncReturn<T, Args extends any[]> = AsyncState<T> & {
  run: (...args: Args) => Promise<void>;
  reset: () => void;
};

/**
 * useAsync
 *
 * Run and manage an async function with loading, result, and error states.
 *
 * @param asyncFn Async function to execute
 * @param autoRun Whether to run automatically on mount (default: false)
 * @param deps Dependency array (if autoRun is true)
 * @returns { value, loading, error, run, reset }
 */

function useAsync<T, Args extends any[]>(
  asyncFn: (...args: Args) => Promise<T>,
  autoRun = false,
  deps: any[] = []
): UseAsyncReturn<T, Args> {
  const [state, setState] = useState<AsyncState<T>>({
    error: null,
    loading: autoRun,
    value: null,
  });

  const mountedRef = useRef(true);

  const run = useCallback(async (...args: Args) => {
    setState((prev) => ({ ...prev, error: null, loading: true }));

    try {
      const result = await asyncFn(...args);
      if (!mountedRef.current) return;
      setState({ value: result, loading: false, error: null });
    } catch (err: any) {
      if (!mountedRef.current) return;
      setState({
        error: err?.message || "Unknown error",
        value: null,
        loading: false,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ value: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  useEffect(() => {
    if (autoRun) {
      (run as any)();
    }
  }, [autoRun, run, ...deps]); // Run when dependencies change

  return { ...state, run, reset };
}

export default useAsync;
