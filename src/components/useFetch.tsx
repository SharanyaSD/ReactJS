import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface FetchResult {
  loading: boolean;
  error: string | null;
  data: Todo[];
}

const useFetch = (url: string): FetchResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const todos = await response.json();
        setData(todos);
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
