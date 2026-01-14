import { useState, useEffect, useCallback } from "react";

export function useFetch(url: string, refreshState: number) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError(`API error: ${response.status}`);
        return;
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshState]);

  return { data, error, loading, refetch: fetchData };
}
