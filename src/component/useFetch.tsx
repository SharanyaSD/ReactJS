import { useState, useEffect } from "react";
import { url } from "../utils/TodoApi";
import { TodoInterface } from "../utils/todoInterface";

interface FetchResult {
  loading: boolean;
  error: string | null;
  data: TodoInterface[];
}

const useFetch = (): FetchResult => {
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const [data, setData] = useState<TodoInterface[]>([]);

  const [fetchData, setFetchData] = useState<FetchResult>({
    data: [],
    loading: true,
    error: null,
  });

  //to get desired data - list of todos we prse the response and get response body
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const todos = await response.json();
        setFetchData({
          data: todos,
          loading: false,
          error: null,
        });
      } catch (error) {
        setFetchData({
          data: [],
          loading: false,
          error: `Error : ${error}`,
        });
      }
    };

    fetchData();
  }, []);

  return fetchData;
};

export default useFetch;
