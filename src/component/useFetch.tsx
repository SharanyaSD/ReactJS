import { url } from "../utils/TodoApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// interface FetchResult {
//   loading: boolean;
//   error: string | null;
//   data: TodoInterface[];
// }

// const useFetch = (): FetchResult => {
//   const [fetchData, setFetchData] = useState<FetchResult>({
//     data: [],
//     loading: true,
//     error: null,
//   });

//   //to get desired data - list of todos we prse the response and get response body
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch todos");
//         }
//         const todos = await response.json();
//         setFetchData({
//           data: todos,
//           loading: false,
//           error: null,
//         });
//       } catch (error) {
//         setFetchData({
//           data: [],
//           loading: false,
//           error: `Error : ${error}`,
//         });
//       }
//     };

//     fetchData();
//   }, []);

//   return fetchData;
// };

const useFetch = (currentPage: number, sortBy: string, status: string) => {
  // const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", currentPage, sortBy, status],
    placeholderData: keepPreviousData,

    queryFn: async () => {
      const newUrl = new URL(url);
      newUrl.searchParams.set("_page", String(currentPage));
      newUrl.searchParams.set("_per_page", String(3));

      if (sortBy !== "none") newUrl.searchParams.set("_sort", sortBy);
      if (status !== "all") {
        newUrl.searchParams.set("completed", status === "true" ? "1" : "0");
      }

      const response = await fetch(newUrl.href);
      if (!response.ok) {
        throw new Error("Failed to fetch todo");
      }
      return response.json();
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};
export default useFetch;
