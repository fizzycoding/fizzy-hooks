import { useCallback, useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

/**
 * useFetch
 *
 * Fetches data from an API with built-in loading, error, and refetch support.
 *
 * @param url - The API endpoint to fetch from.
 * @param options - Optional fetch options (method, headers, etc).
 * @param dependencies - Optional array of dependencies to refetch on change.
 * @returns Object with `data`, `loading`, `error`, and `refetch` function.
 */

function useFetch<T = any>(
  url: string,
  options?: RequestInit,
  dependencies: any[] = []
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json = (await res.json()) as T;
      setState({ error: null, loading: false, data: json });
    } catch (err: any) {
      setState({
        data: null,
        loading: false,
        error: err.message || "Unknown error",
      });
    }
  }, [url, JSON.stringify(options)]);
  useEffect(() => {
    fetchData();
  }, [url, ...dependencies]);

  return { ...state, refetch: fetchData };
}

export default useFetch;
